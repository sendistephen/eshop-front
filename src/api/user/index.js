import { API } from '../../config';

// get user info
export const read = async (userId, token) => {
  try {
    const res = await fetch(`${API}/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// update user info
export const update = async (userId, token, user) => {
  try {
    const res = await fetch(`${API}/user/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// update user info in LS
export const updateUser = (user, next) => {
  try {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('jwt')) {
        let auth = JSON.parse(localStorage.getItem('jwt'));
        auth.foundUser = user;
        localStorage.setItem('jwt', JSON.stringify(auth));
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// get purchase history
export const getPurchaseHistory = async (userId, token) => {
  try {
    const res = await fetch(`${API}/orders/by/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
