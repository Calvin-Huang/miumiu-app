/**
 * Created by Calvin Huang on 3/14/17.
 */

import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';

import { AUTHENTICATION_TOKEN_KEY, JWT_SECRET } from '../Constants/config';
import { JWTExpiredError } from './errors';

export function setAuthenticationToken(token) {
  return AsyncStorage.setItem(AUTHENTICATION_TOKEN_KEY, token);
}

export async function getAuthenticationToken() {
  const jwtToken = await AsyncStorage.getItem(AUTHENTICATION_TOKEN_KEY);

  if (jwtToken) {
    const { exp } = jwtDecode(jwtToken);
    const currentTime = (new Date()).getTime();

    if (exp * 1000 < currentTime) {
      throw new JWTExpiredError(jwtToken);
    }
  }

  return jwtToken;
}

export async function currentUser() {
  const jwtToken = await getAuthenticationToken();

  if (jwtToken) {
    return jwtDecode(jwtToken);
  } else {
    return null;
  }
}

export async function signOut() {
  return AsyncStorage.removeItem(AUTHENTICATION_TOKEN_KEY);
}
