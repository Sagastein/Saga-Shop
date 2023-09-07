/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// CartVisibilityContext.js
import { createContext, useContext, useState } from "react";

const CartVisibilityContext = createContext();

export const CartVisibilityProvider = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const showCart = () => {
    setIsCartVisible(true);
  };

  const hideCart = () => {
    setIsCartVisible(false);
  };

  return (
    <CartVisibilityContext.Provider
      value={{
        isCartVisible,
        showCart,
        hideCart,
      }}
    >
      {children}
    </CartVisibilityContext.Provider>
  );
};

export const useCartVisibility = () => {
  return useContext(CartVisibilityContext);
};
