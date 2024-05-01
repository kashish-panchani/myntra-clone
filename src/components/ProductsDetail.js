import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../components/CartContext";
import useToast from "../Customhook/useToast";

const ProductsDetail = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { success } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const isInWishlist = wishlist.some((item) => item.id === productId);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((item) => item.id !== productId)
      : [...wishlist, products];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    toast[isInWishlist ? "error" : "success"](
      isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      }
    );
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(isLoggedIn === "true");
  }, []);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!products) return null;

  return (
    <>
      <div className="container mx-auto py-20 block md:flex md:justify-center">
        <div className="flex justify-center items-center w-full">
          <div className="p-4 flex-wrap grid xl:grid-cols-2 md:grid-cols-2 md:p-0 gap-2">
            {products.images.map((image, index) => (
              <div
                key={index}
                className="w-full xl:w-[350px] xl:h-[350px] lg:w-[290px] lg:h-[290px] md:w-[200px] md:h-[200px] border "
              >
                <img
                  src={image}
                  alt="image"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col px-4 sm:px-16 gap-3 xl:gap-5 lg:gap-4 md:gap-2 sm:gap-3 md:px-0 py-5 md:py-20 xl:w-2/3  md:w-[41%]">
          <div className="flex flex-col gap-2  xl:gap-5 lg:gap-4 md:gap-3 sm:gap-3 ">
            <h1 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-xl text-lg  font-bold">
              {products.title}
            </h1>
            <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-base text-sm font-normal">
              {products.category}
            </h1>
            <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm font-normal">
              {products.description}
            </h1>
            <p className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm leading-relaxed font-normal">
              {products.brand}
            </p>
            <div className="border border-gary-200 w-14 text-xs    flex items-center font-bold justify-evenly">
              {products.rating}{" "}
              <i className="fa-solid fa-star mt-1 text-xs text-teal-500"></i>
            </div>
            <hr />
          </div>

          <div className="flex items-center my-1 xl:text-2xl   font-bold text-black">
            <p className="xl:text-2xl lg:text-lg md:text-sm sm:text-sm text-xs font-bold">
              ₹
              {products.price -
                (
                  (products.price * products.discountPercentage) /
                  100
                ).toFixed()}
            </p>
            <p className="text-xs xl:text-xl lg:text-base md:text-sm sm:text-sm opacity-40 font-normal px-2 leading-relaxed line-through">
              ₹{products.price}
            </p>
            <span className="opacity-40 text-xs  xl:text-xl lg:text-sm  md:text-sm sm:text-sm font-normal">
              {" "}
              MRP
            </span>{" "}
            <p className=" text-xs xl:text-lg leading-relaxed lg:text-sm md:text-sm sm:text-sm font-bold px-2 text-red-400">
              ({products.discountPercentage}% off)
            </p>
          </div>
          <div>
            <p className="text-sm xl:text-xl lg:text-lg md:text-sm sm:text-base leading-relaxed ">
              <label htmlFor="" className="text-teal-600 font-semibold">
                In stock :{" "}
              </label>
              {products.stock}
            </p>
          </div>
          <div className="text-teal-600 font-bold text-sm xl:text-xl lg:text-base md:text-sm sm:text-sm ">
            inclusive of all taxes
          </div>

          <div className="flex flex-row gap-1 w-60 sm:w-72 h-10 lg:w-96">
            <button
              className="text-[10px] xl:text-base  lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32"
              onClick={() => {
                addToCart(products)
               
              }}
            >
              {cartItems.some((item) => item.id === products.id) ? (
                <Link to="/cart" className="text-white">
                  GO TO CART <i className="fa-solid fa-arrow-right ml-1"></i>
                </Link>
              ) : (
                "ADD TO CART"
              )}
            </button>

            {wishlist?.some((item) => item.id === products.id) ? (
              <div className="text-[10px] xl:text-base cursor-not-allowed flex justify-center items-center py-1   lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold  border flex-1 text-center mr-3 w-32">
                <i className="fa fa-heart sm:text-base  text-rose-500"></i>
                <span className=" ml-1 font-bold">WISHLISTED</span>
              </div>
            ) : (
              <div
                className="text-[10px] xl:text-base  flex justify-center items-center lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold  border flex-1 text-center mr-3 w-32"
                onClick={(e) => whishlistbtn(products.id, e)}
              >
                <i className="fa-regular fa-heart sm:text-sm"></i>
                <span className=" ml-1 font-bold">WISHLIST</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDetail;
