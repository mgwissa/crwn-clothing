import { createContext, useState } from "react";

//as the actual value want to access
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}