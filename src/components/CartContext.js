import React, { createContext, useContext, useEffect, useState } from "react";
import useToast from "../Customhook/useToast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [cartItemsCount, setCartItemsCount] = useState(cartItems.length);
  const { success } = useToast();
  useEffect(() => {
    setCartItemsCount(cartItems.length);
  }, [cartItems]);
  const addToCart = (products) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === products.id);
    const maxQuantity = 10;
    const productWithQuantity = { ...products, quantity: 1 };
    if (!isAlreadyInCart && cartItems.length < maxQuantity) {
      setCartItems([...cartItems, productWithQuantity]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, productWithQuantity])
      );

      success("Item added to cart.");
    }
  };
  const moveToCart = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    success("Item moved to cart successfully");
  };

  const removeFromCart = (productToRemove) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== productToRemove.id
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  const removeAllCartItems = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        cartItemsCount,
        moveToCart,
        removeFromCart,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
