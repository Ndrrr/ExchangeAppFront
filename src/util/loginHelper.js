var isLoggedIn = false;
export const getIsLoggedIn = () => {
  return isLoggedIn;
}

export const setNewLogIn = (value) => {
  isLoggedIn = value;
}