import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  if(!decoded) return false;
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export const getAccessToken = () => {
  const token = cookies.get('accessToken');
  if (token && !isTokenExpired(token)) {
    return token;
  }
  return null;
}

export const getDecodedToken = (token) => {
  if (token == null) {
    token = getAccessToken();
  }
  if(token) {
    return jwtDecode(token);
  }
  return null;
}

export const setAccessToken = async (accessToken) => {
  cookies.set('accessToken', accessToken, { path: '/' });
}

export const removeCookies = async () => {
  cookies.remove('accessToken', { path: '/' });
  cookies.remove('fullName', { path: '/' });
}

export const getRole = () => {
  const accessToken = getDecodedToken();
  if (accessToken) {
    return accessToken.role;
  }
  return null;
}

export const removeTokenIfExpired = async () => {
  const token = getAccessToken();
  if (token) {
    if (isTokenExpired(token)) {
      await removeCookies();
    }
  }
}