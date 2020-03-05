import axios from 'axios';

export const isBrowser = () => typeof window !== 'undefined';
export const getUser = () =>
  isBrowser() && window.localStorage.getItem('gatsbyUser')
    ? JSON.parse(window.localStorage.getItem('gatsbyUser'))
    : {};
const setUser = user =>
  window.localStorage.setItem('gatsbyUser', JSON.stringify(user));
export const handleLogin = async ({ username, password }) => {
  const data = {
    shop_member: {
      username,
      password,
    },
  };

  let response = await fetch(
    `${process.env.GATSBY_API_URL}/shop_members/sign_in.json`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // <-- Post parameters
    }
  );
  let user = await response.json();
  if (user) {
    return setUser(user);
  }
  return false;
};

export const isLoggedIn = () => {
  if (!isBrowser) return false;

  const user = getUser();

  return true;
};

export const logout = callback => {
  setUser({});
  callback();
};
