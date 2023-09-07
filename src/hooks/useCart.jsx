import { useState, useEffect } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const totalCount = cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
    setCartCount(totalCount);
  }, [cartItems]);

  const [cartCount, setCartCount] = useState(0);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity = item.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  return { cartCount, cartItems, addToCart };
}
