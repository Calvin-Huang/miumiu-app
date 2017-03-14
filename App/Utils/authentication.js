/**
 * Created by Calvin Huang on 3/14/17.
 */

import { AsyncStorage } from 'react-native';
import jwt from 'jsonwebtoken';

import { AUTHENTICATION_TOKEN_KEY, JWT_SECRET } from '../Constants/config';
import { JWTExpiredError } from './errors';

export function setAuthenticationToken(token) {
  return AsyncStorage.setItem(AUTHENTICATION_TOKEN_KEY, token);
}

export async function getAuthenticationToken() {
  const jwtToken = await AsyncStorage.getItem(AUTHENTICATION_TOKEN_KEY);

  const { exp } = jwt.verify(jwtToken, JWT_SECRET);
  const currentTime = (new Date()).getTime();

  if (exp * 1000 < currentTime) {
    throw new JWTExpiredError(jwtToken);
  }

  return jwtToken;
}

export async function currentUser() {
  const jwtToken = await getAuthenticationToken();

  return jwt.verify(jwtToken, JWT_SECRET);
}
