import React, { createContext, useContext, useEffect, useState } from "react";
import useToast from "../hook/useToast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [cartItemsCount, setCartItemsCount] = useState(cartItems.length);
  const { success } = useToast();
  useEffect(() => {
    setCartItemsCount(cartItems.length);
  }, [cartItems]);
  useEffect(() => {
    const count = cartItems.filter((item) => item.checked).length;
    setSelectedItemCount(count);
  }, []);

  const addToCart = (products) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === products.id);
   
    const productWithQuantity = { ...products, quantity: 1, checked: true };
    if (!isAlreadyInCart) {
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
        item.id === product.id
          ? {...item, quantity: item.quantity + 1, checked: true }
          : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [
        ...cartItems,
        { ...product, quantity: 1, checked: true },
      ];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    success("Item moved to cart successfully");
  };

  const removeFromCart = (productsToRemove) => {
    let updatedCartItems;
    console.log("productsToRemove", productsToRemove);
    if (Array.isArray(productsToRemove)) {
      updatedCartItems = cartItems.filter(
        (item) => !productsToRemove.some((product) => product.id === item.id)
      );
    } else {
      updatedCartItems = cartItems.filter(
        (item) => item.id !== productsToRemove.id
      );
    }
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItemsCount(updatedCartItems.length);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        cartItemsCount,
        moveToCart,
        removeFromCart,
        setSelectedItemCount,
        selectedItemCount,
        setCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
