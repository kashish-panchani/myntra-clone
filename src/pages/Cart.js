import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useToast from "../Customhook/useToast";
import { useCart } from "../components/CartContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const { error } = useToast();
  const { removeFromCart, removeAllCartItems } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const decrease = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(updatedCartItems);
  };
  const handleClearCart = () => {
    removeAllCartItems();
    setShowClearModal(false);
    error("All items removed from cart");
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const increase = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
        : item
    );
    setCartItems(updatedCartItems);
  };
  const cartClose = (itemToRemove) => {
    setItemToRemove(itemToRemove);
  };
  const handleRemove = () => {
    const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCartItems);
    removeFromCart(itemToRemove);
    error("Product removed from cart");
    setItemToRemove(null);
  };
  const handleCancelRemove = () => {
    setItemToRemove(null);
  };
  const openClearModal = () => {
    setShowClearModal(true);
  };
  const closeClearModal = () => {
    setShowClearModal(false);
  };

  return (
    <div>
      <div className="container mx-auto xl:p-10 lg:p-12 md:p-10 sm:p-10 pt-7">
        {cartItems.length === 0 ? (
        
          <div className=" text-center px-6">
            <div className="flex justify-center items-center">
              <img
                src="../empty.svg"
                alt=""
                className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80"
              />
            </div>
            <div>
              <p className="font-bold text-base sm:text-2xl pb-2">
                Hey,it feels so light!
              </p>
              <p className="sm:text-base md:text-lg text-xs text-gray-400">
                There is nothing in your cart.Let's add some items.
              </p>
            </div>
            <div>
              <Link to="/wishlist">
                <button className="border border-blue-800  rounded-md py-3 px-3 text-[10px] sm:text-sm sm:px-6 sm:py-5 md:px-8 md:py-5 md:text-xl xl:px-10 xl:text-lg xl:py-4 m-10 text-blue-600 font-bold">
                  ADD ITEMS FROM WISHLIST
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="my-2 flex justify-end">
              <button
                className=" rounded-md mt-10 text-[10px] xl:mr-24 sm:text-[11px] text-slate-500 font-bold"
                onClick={openClearModal}
              >
                CLEAR CART
              </button>
            </div>
            {showClearModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-3 sm:p-6 w-60 sm:w-80 text-gray-500 rounded-lg shadow-lg">
                  <p className="text-xs sm:text-base font-semibold mb-4">
                    Are you sure you want to remove all items from cart.
                  </p>
                  <hr />
                  <div className="flex justify-between items-center text-[10px] sm:text-xs mx-8 mt-2 font-semibold">
                    <button
                      className="text-red-600 rounded-lg"
                      onClick={handleClearCart}
                    >
                      REMOVE
                    </button>
                    |
                    <button
                      className="text-black rounded-lg"
                      onClick={closeClearModal}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mx-auto max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {cartItems.map((item, inx) => (
                  <div key={inx}>
                    <div className="responsive flex justify-between  mb-1 sm:mb-6 border bg-white sm:rounded-lg sm:p-7 p-5  ">
                      <img
                        src={item.thumbnail}
                        alt="product-image"
                        className="w-[100px] h-[100px]           
                          xl:w-44 lg:w-36 mt-5 sm:mt-0 md:w-32
                            sm:w-40 object-cover sm:object-contain xl:h-44 lg:h-36  md:h-32 sm:h-40"
                      />

                      <div className="ml-4 flex xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[66%] w-[100%] sm:justify-between">
                        <div className="mt-6 sm:mt-0">
                          <Link to={`/productsdetail/${item.id}`}>
                            <h2 className="text-[12px] xl:text-lg lg:text-base md:text-[14px] sm:text-[13px] font-bold text-gray-900">
                              {item.title}
                            </h2>
                          </Link>
                          <p className="my-2 text-[12px] xl:text-sm lg:text-[13px] md:text-[12px]  sm:text-[12px] text-gray-700">
                            {item.category}
                          </p>
                          <p className="my-2 text-[11px] xl:text-[13px] lg:text-[11px] md:text-[12px] sm:text-[10px] line-clamp-1 text-gray-700">
                            {item.description}
                          </p>
                          <p className="my-2 text-[10px] xl:text-[14px] lg:text-[12px] md:text-[11px] sm:text-[10px] font-bold">
                            <i className="fa-solid fa-indian-rupee-sign text-gray-500 xl:text-[12px] lg:text-[11px]"></i>
                            {item.price -
                              parseInt(
                                (item.price * item.discountPercentage) / 100
                              )}{" "}
                            <label htmlFor="" className="text-green-600">
                              (Discount price)
                            </label>
                          </p>
                          <div className="flex items-center border-gray-100">
                            <span
                              className={`border  bg-slate-200 w-3 h-4 text-[10px] px-1 xl:px-2 xl:w-6 xl:h-6 xl:text-sm lg:w-5 lg:h-5 lg:px-2  lg:text-[13px] md:w-4 md:h-4 md:px-1 md:text-[10px] sm:w-3 sm:h-5 sm:px-2 sm:text-[12px] hover:bg-slate-100  ${
                                item.quantity <= 1 ? "cursor-not-allowed" : ""
                              }`}
                              disabled={item.quantity <= 1}
                              onClick={() => decrease(item.id)}
                            >
                              {" "}
                              -{" "}
                            </span>
                            <span className="w-4 h-4 text-[10px] xl:w-6 xl:h-6 xl:py-0 lg:w-5 lg:h-5 lg:px-1  lg:text-[12px] lg:py-0 md:h-4 md:w-4 md:text-[10px] md:px-1 md:py-0 sm:text-[10px] sm:px-[2px] sm:py-[2px] sm:h-5 border bg-white text-center xl:text-base ">
                              {item.quantity}
                            </span>
                            <span
                              className={`border  bg-slate-200 w-3 h-4 text-[10px] px hover:bg-slate-100 xl:px-1 xl:w-6 xl:text-sm xl:h-6 lg:w-5 lg:h-5 lg:px-1  lg:text-[13px]  md:w-4 md:h-4 md:px-1 md:text-[10px] sm:w-4 sm:h-5 sm:px-1 sm:text-[12px]   ${
                                item.quantity >= 10 ? "cursor-not-allowed" : ""
                              }`}
                              disabled={item.quantity >= 10}
                              onClick={() => increase(item.id)}
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                        </div>

                        <div className=" absolute right-2 sm:relative mt-[22px] sm:right-1 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 ">
                          <div className="sm:absolute ">
                            <button
                              className="text-[13px] xl:text-xl lg:text-base md:text-sm sm:text-[13px]"
                              onClick={() => {
                                cartClose(item);
                              }}
                            >
                              <i className="fa-solid fa-xmark "></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                    <Link to="/wishlist">
                      <div className="border sm:rounded-lg text-xs sm:text-sm p-4 hover:underline flex justify-between items-center font-semibold">
                        <div className="flex">
                          <i className="fa-regular fa-bookmark mr-2 text-sm"></i>
                          <h1> Add More From Wishlist</h1>
                        </div>

                        <div>
                          <i className="fa-solid fa-greater-than text-xs"></i>
                        </div>
                      </div>
                    </Link>
              </div>
              <div className=" my-2 sm:my-0 sm:mt-6 h-full sm:rounded-lg border bg-white py-6 px-4  md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700  font-bold">Subtotal</p>
                  <p className="text-gray-700"></p>₹
                  {cartItems.reduce(
                    (total, item) =>
                      total +
                      item.quantity *
                        (item.price -
                          parseInt(
                            (item.price * item.discountPercentage) / 100
                          )),
                    0
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700 text-[15px]">Shipping</p>
                  <p className="text-gray-700 text-[15px]">Free</p>
                </div>
                <div className="py-2">
                  <p className="text-gray-700 text-[15px]">Platform fee:</p>
                  <p className="text-gray-700 text-[15px]">Free</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-base font-bold">Total Amount:</p>

                  <p className="mb-1 text-[15px] font-bold">
                    {" "}
                    ₹
                    {cartItems.reduce(
                      (total, item) =>
                        total +
                        item.quantity *
                          (item.price -
                            parseInt(
                              (item.price * item.discountPercentage) / 100
                            )),
                      0
                    )}
                  </p>
                  {itemToRemove && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-3 sm:p-6 w-60 sm:w-80 text-gray-500 rounded-lg shadow-lg">
                        <p className="text-xs sm:text-base font- mb-4">
                          Are you sure you want to remove this item from the
                          cart?
                        </p>
                        <hr />
                        <div className="flex justify-between items-center text-[11px] sm:text-base mx-8 mt-2 font-semibold">
                          <button
                            className=" text-rose-500  rounded-lg "
                            onClick={handleRemove}
                          >
                            Remove
                          </button>
                          |
                          <button
                            className=" text-black rounded-lg"
                            onClick={handleCancelRemove}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
