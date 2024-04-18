import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductsDetail = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
    setCount(savedCartItems.length);

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const addToCart = () => {
    const isAlreadyInCart = cartItems.some(
      (item) => item.id === selectedProduct.id
    );
    const maxQuantity = 10;
    const productWithQuantity = { ...selectedProduct, quantity: 1 };
    if (!isAlreadyInCart && cartItems.length < maxQuantity) {
      setCartItems([...cartItems, productWithQuantity]);
      setCount(count + 1);
      toast.success("Item added to cart successfully", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, productWithQuantity])
      );
    }
  };

  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist.some((item) => item.id === productId);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((item) => item.id !== productId)
      : [...wishlist, selectedProduct];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist",JSON.stringify(updatedWishlist));
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
    window.scrollTo(0, 0);
  }, []);

  if (!selectedProduct) return null;

  return (
    <>
      <div className="container mx-auto py-20 block md:flex md:justify-center">
        <div className="flex justify-center items-center w-full">
          <div className="p-4 flex-wrap grid xl:grid-cols-2 md:grid-cols-2 md:p-0 gap-2">
            {selectedProduct.images.map((image, index) => (
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
              {selectedProduct.title}
            </h1>
            <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-base text-sm font-normal">
              {selectedProduct.category}
            </h1>
            <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm font-normal">
              {selectedProduct.description}
            </h1>
            <p className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm leading-relaxed font-normal">
              {selectedProduct.brand}
            </p>
            <div className="border border-gary-200 w-14 text-xs    flex items-center font-bold justify-evenly">
              {selectedProduct.rating}{" "}
              <i className="fa-solid fa-star mt-1 text-xs text-teal-500"></i>
            </div>
            <hr />
          </div>

          <div className="flex items-center my-1 xl:text-2xl   font-bold text-black">
            <p className="xl:text-2xl lg:text-lg md:text-sm sm:text-sm text-xs font-bold">
              ₹
              {selectedProduct.price -
                (
                  (selectedProduct.price * selectedProduct.discountPercentage) /
                  100
                ).toFixed()}
            </p>
            <p className="text-xs xl:text-xl lg:text-base md:text-sm sm:text-sm opacity-40 font-normal px-2 leading-relaxed line-through">
              ₹{selectedProduct.price}
            </p>
            <span className="opacity-40 text-xs  xl:text-xl lg:text-sm  md:text-sm sm:text-sm font-normal">
              {" "}
              MRP
            </span>{" "}
            <p className=" text-xs xl:text-lg leading-relaxed lg:text-sm md:text-sm sm:text-sm font-bold px-2 text-red-400">
              ({selectedProduct.discountPercentage}% off)
            </p>
          </div>
          <div>
            <p className="text-sm xl:text-xl lg:text-lg md:text-sm sm:text-base leading-relaxed ">
              <label htmlFor="" className="text-teal-600 font-semibold">
                In stock :{" "}
              </label>
              {selectedProduct.stock}
            </p>
          </div>
          <div className="text-teal-600 font-bold text-sm xl:text-xl lg:text-base md:text-sm sm:text-sm ">
            inclusive of all taxes
          </div>

          <div className="flex flex-row gap-1 w-60 sm:w-72  lg:w-96">
            <button
              className="text-[10px] xl:text-base  lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32"
              onClick={addToCart}
            >
              {cartItems.some((item) => item.id === selectedProduct.id) ? (
                <Link to="/cart" className="text-white">
                  GO TO CART <i className="fa-solid fa-arrow-right ml-1"></i>
                </Link>
              ) : (
                "ADD TO CART"
              )}
            </button>
            <button
              className={`text-[10px] xl:text-base lg:text-sm  md:text-xs sm:text-xs  rounded-none py-3 sm:px-4 lg:h-16 font-bold bg-white border border-gray-700 text-black flex-1 text-center mr-3 w-full${
                wishlist?.some((item) => item.id === selectedProduct.id)
                  ? "bg-gray-300"
                  : ""
              }`}
              onClick={(e) => {
                whishlistbtn(selectedProduct.id, e);
              }}
            >
              {wishlist?.some((item) => item.id === selectedProduct.id) ? (
                <i className="fas fa-heart text-red-400 mr-1"></i>
              ) : (
                <i className="fa-regular fa-heart "></i>
              )}
              <label htmlFor="" className="font-semibold mx-2">
                {wishlist?.some((item) => item.id === selectedProduct.id)
                  ? "WISHLISTED"
                  : "WISHLIST"}
              </label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDetail;
