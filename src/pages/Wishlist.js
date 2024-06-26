import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import imagelogin from "../Images/login/login.png";
const Wishlist = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const moveToCart = (product, e) => {
    e.stopPropagation();
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (isInCart) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast.success("Item moved to cart successfully", {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });
  };
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
  const removeFromWishlist = (productId, e) => {
    e.stopPropagation();
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    toast.error("Removed from wishlist", {
      style: {
        width: "200px",
        fontSize: "12px",
        float: "right",
        marginTop: "50px",
      },
    });
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (  
    <div className="overflow-hidden">
      <>
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-32">
            <h1 className="sm:text-xl font-bold mb-4">PLEASE LOG IN</h1>
            <p className="text-gray-400 sm:text-lg  text-xs ">
              Login to view items in your wishlist.
            </p>
            <div className="sm:py-10 py-7 ">
              <img
                src={imagelogin}
                alt="PLEASELOGIN"
                className="sm:h-24 h-16  "
              />
            </div>
            <Link
              to="/login"
              className="border font-semibold text-[10px] py-2 px-6  sm:text-lg border-blue-600 text-blue-600 sm:py-2 sm:px-9   rounded"
            >
              LOGIN
            </Link>
          </div>
        ) : (
          <div className="pb-10 pt-20  sm:pb-0 sm:container sm:mx-auto">
            {wishlist.length ? (
              <>
                <div className="sm:container  my-5 sm:my-0   pl-4 sm:mt-16  sm:pl-16 sm:mx-auto font-bold text-xs sm:text-base">
                  My Wishlist{" "}
                  <span className="font-normal ">{wishlist.length} items</span>
                </div>

                <div className=" sm:mx-auto p-1 sm:p-0 relative mx-1 max-w-full grid grid-cols-2   xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 sm:m-8 overflow-hidden ">
                  {wishlist.map((product, inx) => (
                    <div
                      className="relative  flex flex-wrap justify-center items-center m-1 sm:mx-4 sm:my-3  border hover:shadow-xl border-gray-100 bg-white shadow-md"
                      key={inx}
                    >
                      <div className="w-full">
                        <button
                          className="float-right"
                          onClick={(e) => removeFromWishlist(product.id, e)}
                        >
                          <i className="fa-solid fa-xmark my-3 mr-2   sm:mr-5"></i>
                        </button>
                      </div>
                      <Link
                        to={`/productsdetail/${product.id}`}
                        className="relative  mx-3  flex overflow-hidden "
                      >
                        <img
                          className="object-contain  w-full h-28  "
                          src={product.thumbnail}
                          alt="product image"
                        />
                      </Link>
                      <div className="mt-6 sm:px-5 w-full sm:pb-5">
                        <a href="#">
                          <h5 className="capitalize text-sm  pl-4 sm:pl-0  tracking-tight line-clamp-1 text-gray-500">
                            {product.title}
                          </h5>
                        </a>
                        <div className="sm:mt-2 pl-4 sm:pl-0 mb-2 sm:mb-5  flex items-center justify-between">
                          <p>
                            <span className="text-[10px] sm:text-sm  font-bold leading-relaxed">
                              ₹
                              {product.price -
                                parseInt(
                                  (product.price * product.discountPercentage) /
                                    100
                                )}
                            </span>

                            <span className="font-semibold text-[10px] sm:text-xs mx-2 line-through text-gray-400">
                              ₹{product.price}
                            </span>
                            <span className=" text-[11px] leading-relaxed  sm:font-bold text-orange-300">
                              ({Math.floor(product.discountPercentage)}% off)
                            </span>
                          </p>
                        </div>
                        <a
                          href="#"
                          className="flex items-center justify-center border-t sm:border sm:bg-slate-900 px-5 py-3 sm:py-2.5  text-sm font-medium text-rose-500 sm:text-white  hover:sm:bg-gray-700 focus:outline-none focus:ring-4 sm:focus:ring-blue-300"
                          onClick={(e) => moveToCart(product, e)}
                        >
                          Move to cart
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <h1 className="pt-36 flex justify-center items-center font-bold text-gray-700 text-base xl:text-2xl md:text-xl sm:text-lg">
                  YOUR WISHLIST IS EMPTY
                </h1>
                <p className="flex justify-center items-center text-sm sm:text-base md:text-lg xl:text-xl  text-gray-400 py-5 px-10  ">
                  Add items that you like to your wishlist. Review them anytime
                  and easily move them to the bag.
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src="../empty-wishlist.png"
                    className=" py-3 w-56 xl:w-96 md:w-80"
                  />
                </div>
                <div className="flex justify-center items-center ">
                  <button className=" text-blue-600 text-sm font-bold border rounded-lg border-blue-800 my-10 py-4 px-4 xl:px-14 xl:text-xl md:px-10 md:text-base cursor-pointer">
                    <Link to="/ALL">CONTINUE SHOPPING</Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default Wishlist;
