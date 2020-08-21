const USER_KEY = 'SESSION/USER'
const TOKEN_KEY = 'SESSION/TOKEN'
const REFRESH_TOKEN_KEY = 'SESSION/REFRESH_TOKEN'

const storage = sessionStorage;

export const clear = () => {
  storage.removeItem(USER_KEY);
  storage.removeItem(TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
}

export const setAuthenticationResult = result => {
  if(!result) return;
  setUser(result.user);
  setToken(result.token);
  setRefreshToken(result.refreshToken);
}

export const setUser = user => {
  storage.setItem(USER_KEY, JSON.stringify(user));
}

export const getUser = () => {
  try {
    const data = storage.getItem(USER_KEY);
    return JSON.parse(data);
  }
  catch {
    return null;
  }
}

export const setToken = token => {
  storage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
  return storage.getItem(TOKEN_KEY);
}

export const setRefreshToken = token => {
  storage.setItem(REFRESH_TOKEN_KEY, token);
}

export const getRefreshToken = () => {
  return storage.getItem(REFRESH_TOKEN_KEY);
}