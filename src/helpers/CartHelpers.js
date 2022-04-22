export const addProductToCart = (item, next) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    // check if we have the cart in the ls
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    // Add item to cart
    cart.push({
      ...item,
      count: 1,
    });
    // avoid duplicate items
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });
    // set cart back to LS
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart[index].count = count;
      }
      return product;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
      return cart;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
    next();
  }
};
