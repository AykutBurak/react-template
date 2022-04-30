import { getUser } from "./users";

export const auth = {
  username: null,
  isAuth: false,
};

export function login(userInformation) {
  const user = getUser(userInformation);

  if (user) {
    auth.username = user.username;
    auth.isAuth = true;

    return user;
  }

  return false;
}

export function logout() {
  auth.username = null;
  auth.isAuth = false;
}
