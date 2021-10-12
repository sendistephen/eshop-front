import { API } from "config";

export const createCategory = async (userId, token, category) => {
  try {
    const res = await fetch(`${API}/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${API}/categories`, { method: 'GET' });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
