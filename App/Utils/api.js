/**
 * Created by Calvin Huang on 3/14/17.
 */

// Reference to pepperoni-app-kit
// https://github.com/futurice/pepperoni-app-kit

import HttpError from 'standard-http-error';

import { TIMEOUT, BASE_URL, REFRESH_TOKEN_PATH, API_DEV_MODE } from '../Constants/config';
import { getAuthenticationToken, setAuthenticationToken } from './authentication';
import { JWTExpiredError } from './errors';

import EventEmitter from 'event-emitter';

/**
 * All API errors are emitted on this channel for interested listeners.
 */
export const errors = new EventEmitter();

export async function get(path, body) {
  let pathQuery = path;
  if (body) {
    pathQuery += `?${Object.keys(body).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&')}`;
  }

  return bodyOf(request('GET', pathQuery, null));
}

export async function post(path, body) {
  return bodyOf(request('POST', path, body));
}

export async function put(path, body) {
  return bodyOf(request('PUT', path, body));
}

export async function del(path) {
  return bodyOf(request('DELETE', path));
}

export function url(path) {
  return (path.indexOf('/') === 0) ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
}

async function request(method, path, body, suppressRedBox = API_DEV_MODE) {
  const endPoint = url(path);

  let token;

  try {
    token = await getAuthenticationToken();
  } catch (error) {
    if (error instanceof JWTExpiredError) {
      const { jwtToken: expiredToken } = error;
      const refreshTokenEndPoint = url(REFRESH_TOKEN_PATH);
      const headers = getRequestHeaders(null, expiredToken);

      if (suppressRedBox) {
        console.log(`💬  Refresh expired token, expiredToken: ${expiredToken}`);
      }

      try {
        const response = await timeout(fetch(refreshTokenEndPoint, { headers }), TIMEOUT);
        const { body: { token: newToken } } = await handleResponse(response);

        token = newToken;

        if (suppressRedBox) {
          console.log(`✅  Expired token refreshed, newToken: ${newToken}`);
        }

        // Store new token to local storage.
        setAuthenticationToken(newToken);
      } catch (error) {

        if (suppressRedBox) {
          console.log('❌  Refresh expired token failed ❌');
          console.log(error);
        }

        errors.emit('JWTRefresh', error);
      }
    }
  }

  const headers = getRequestHeaders(body, token);
  const options = body
    ? { method, headers, body: JSON.stringify(body) }
    : { method, headers };

  if (suppressRedBox) {
    console.log('🚀  Request Options 🚀');
    console.log(options);
  }

  const response = await timeout(fetch(endPoint, options), TIMEOUT);

  if (suppressRedBox) {
    console.log('🎯  Response 🎯');
    console.log(response);
  }

  return handleResponse(response);
}

function getRequestHeaders(body, token) {
  const headers = body
    ? { Accept: 'application/json', 'Content-Type': 'application/json' }
    : { Accept: 'application/json' };

  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  return headers;
}

// Throw HttpError when status code bigger then 400.
async function handleResponse(response) {
  const { status, headers } = response;
  if (status >= 400) {
    const message = await getErrorMessageSafely(response);
    const error = new HttpError(status, message);

    errors.emit(`${status}`, error);

    throw error;
  }

  const responseBody = await response.text();
  const responseJSON = JSON.parse((!responseBody || responseBody === '') ? '{}' : responseBody);

  // Store Authorization to AsyncStorage
  const { token } = responseJSON;
  if (token) {
    let oldJwtToken;

    try {
      oldJwtToken = await getAuthenticationToken();
    } catch (error) {

      // Retrieve expired token.
      if (error instanceof JWTExpiredError) {
        oldJwtToken = error.jwtToken;
      }
    }

    // Only retrieved token different to old one needs be stored.
    if (oldJwtToken !== token) {
      setAuthenticationToken(token);
    }
  }

  return {
    status,
    headers,
    body: responseJSON,
  };
}

async function getErrorMessageSafely(response) {
  try {
    const message = await response.text();

    if (!message) {
      return '';
    }

    // In miumiu project, all error structure is: { error: [message] }
    const { error } = JSON.parse(message);

    return error || message;

  } catch (error) {
    return response._bodyInit;
  }
}

async function bodyOf(requestPromise) {
  const { body } = await requestPromise;
  return body;
}

function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Request Timeout'));
    }, ms);

    promise
      .then(
        (response) => {
          clearTimeout(timer);
          resolve(response);
        },
        (error) => {
          clearTimeout(timer);
          reject(error);
        }
      )
  })
}
