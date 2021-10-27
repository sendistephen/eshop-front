import { API } from 'config';

export const signup = async (user) => {
  try {
    const res = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// save logedin user to localstorage
export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = async (next) => {
  // remove token from LS
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();
    // make request to the api
    try {
      const res = await fetch(`${API}/signout`, {
        method: 'GET',
      });
      if (res) {
        console.log('Signout successfull!');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
