import axios from 'axios';

export const getCurrentUserEmail = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload.email || payload.sub;
  } catch (e) {
    return null;
  }
};

export const loadCart = () => {
  const email = getCurrentUserEmail();
  if (!email) {
    return []; 
  }
  const cart = localStorage.getItem(`cart_${email}`);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  const email = getCurrentUserEmail();
  if (!email) {
    return; 
  }
  localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
};

export const clearCart = () => {
  const email = getCurrentUserEmail();
  if (!email) return;
  localStorage.removeItem(`cart_${email}`);
  window.dispatchEvent(new CustomEvent('cartUpdated'));
};

export const addToCart = (productID, quantity, productDetails = null) => {
  const email = getCurrentUserEmail();
  if (!email) {
    return false;
  }
  
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productID === productID);

  if (index === -1) {
    const cartItem = {
      productID,
      quantity,
      addedAt: new Date().toISOString()
    };
    
    if (productDetails) {
      cartItem.name = productDetails.name;
      cartItem.price = productDetails.price;
      cartItem.labelledPrice = productDetails.labelledPrice;
      cartItem.images = productDetails.images;
      cartItem.category = productDetails.category;
      cartItem.stock = productDetails.stock;
    }
    
    cart.push(cartItem);
  } else {
    const newQuantity = cart[index].quantity + quantity;
    if (newQuantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = newQuantity;
    }
  }
  
  saveCart(cart);
  window.dispatchEvent(new CustomEvent('cartUpdated'));
  return true;
};

export const removeFromCart = (productID) => {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productID === productID);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
};

export const updateCartItemQuantity = (productID, newQuantity) => {
  const cart = loadCart();
  const index = cart.findIndex((item) => item.productID === productID);
  
  if (index !== -1) {
    if (newQuantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = newQuantity;
    }
    
    saveCart(cart);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
};

export const getCartWithProductDetails = async () => {
  const cart = loadCart();
  const cartWithDetails = [];
  
  for (const item of cart) {
    if (item.name && item.price) {
      cartWithDetails.push(item);
    } else {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const allProducts = response.data;
        const product = allProducts.find(p => p.productID === item.productID);
        
        if (product) {
          cartWithDetails.push({
            ...item,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            images: product.images,
            category: product.category,
            stock: product.stock
          });
        }
      } catch (error) {
        cartWithDetails.push(item);
      }
    }
  }
  
  return cartWithDetails;
};

export const getCartSummary = () => {
  const cart = loadCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => {
    return total + (item.price ? item.price * item.quantity : 0);
  }, 0);
  
  return {
    totalItems,
    totalAmount,
    items: cart
  };
};