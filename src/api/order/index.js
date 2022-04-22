import { API } from "../../config";

export const createOrder = async (userId, token, createOrderData) => {
  try {
    const res = await fetch(`${API}/order/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: createOrderData }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
// Admin role
export const listOrders = async (userId, token) => {
  try {
    const res = await fetch(`${API}/order/list/${userId}`, {
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
export const getPaymentStatus = async (userId, token) => {
  try {
    const res = await fetch(`${API}/order/status-values/${userId}`, {
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

export const updateOrderStatus = async (userId, token, orderId, status) => {
  try {
    const res = await fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
