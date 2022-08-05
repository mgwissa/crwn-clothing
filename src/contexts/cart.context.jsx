import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if(existingCartItem) {
    return cartItems.map((cartItem) => 
      cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const decrementCartItem = (cartItems, cartItemToDecrement) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToDecrement.id
  );

  if(existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => 
      cartItem.id !== cartItemToDecrement.id);
  }

  return cartItems.map((cartItem) => 
    cartItem.id === cartItemToDecrement.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
    );
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter((cartItem) =>
    cartItem.id !== cartItemToRemove.id);
}

//as the actual value want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setCartTotal(newCartTotal)
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  };
  
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  };

  const decrementItemFromCart = (cartItemToDecrement) => {
    setCartItems(decrementCartItem(cartItems, cartItemToDecrement))
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    decrementItemFromCart,
    removeItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}