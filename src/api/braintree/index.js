import { API } from "../../config";

export const getBraintreeClientToken = async (userId, token) => {
  try {
    const res = await fetch(`${API}/braintree/get-token/${userId}`, {
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

export const processPayment = async (userId, token, paymentData) => {
  try {
    const res = await fetch(`${API}/braintree/payment/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
