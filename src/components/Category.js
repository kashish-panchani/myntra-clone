import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { settings } from "../Constants/header";
import useToast from "../hook/useToast.js";

const Category = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const [filterCategoryProducts, setfilterCategoryProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sortedProduct, setSortedProduct] = useState(null);
  const [selectedSortOption, setSelectedSortOption] = useState("default");

  const { success, error } = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    sortedProducts("default");
  }, [type]);
  useEffect(() => {
    if (filterCategoryProducts.length > 0) {
      setSortedProduct([...filterCategoryProducts]);
    }
  }, [filterCategoryProducts]);
  const sortedProducts = (value) => {
    setSelectedSortOption(value);
    switch (value) {
      case "better_discount":
        setSortedProduct(
          [...filterCategoryProducts].sort(
            (a, b) =>
              b.price -
              (b.price * b.discountPercentage) / 100 -
              (a.price - (a.price * a.discountPercentage) / 100)
          )
        );
        break;
      case "price_high_to_low":
        setSortedProduct(
          [...filterCategoryProducts].sort(
            (a, b) =>
              b.price -
              (b.price * b.discountPercentage) / 100 -
              (a.price - (a.price * a.discountPercentage) / 100)
          )
        );
        break;
      case "price_low_to_high":
        setSortedProduct(
          [...filterCategoryProducts].sort(
            (a, b) =>
              a.price -
              (a.price * a.discountPercentage) / 100 -
              (b.price - (b.price * b.discountPercentage) / 100)
          )
        );
        break;
      case "customer_rating":
        setSortedProduct(
          [...filterCategoryProducts].sort((a, b) => b.rating - a.rating)
        );
        break;
      default:
        setSortedProduct([...filterCategoryProducts]);
        break;
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const category = products.filter((product) => product.category === type);
    setfilterCategoryProducts(category);
    window.scrollTo(0, 0);
  }, [products, type]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);
  const whishlistbtn = (productId, e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const isInWishlist = wishlist?.some((item) => item.id === productId);
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      setWishlist(updatedWishlist);
      error("Removed from wishlist");

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = products.find(
        (product) => product.id === productId
      );
      if (updatedWishlist) {
        setWishlist([...wishlist, updatedWishlist]);
        success("Added to wishlist");
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...wishlist, updatedWishlist])
        );
      }
    }
  };

  return (
    <>
      <div className="sm:container sm:mx-auto pt-16 sm:pt-20 pb-10">
        <div className="flex justify-end">
          <div className="border border-slate-200 sm:mb-8 mr-2 m-2">
            <label className="p-2 text-xs sm:text-[13px] text-gray-500 ">
              Sort by:
            </label>
            <select
              className="p-2 w-[245px] font-bold text-xs text-gray-500 sm:text-[13px] sm:w-[12rem] outline-none bg-white"
              onChange={(e) => sortedProducts(e.target.value)}
              value={selectedSortOption}
            >
              <option value="default">Recommended</option>
              <option value="better_discount">Better Discount</option>
              <option value="price_high_to_low">Price: High To Low</option>
              <option value="price_low_to_high">Price: Low To High</option>
              <option value="customer_rating">Customer Rating</option>
            </select>
          </div>
        </div>
        {isMobile ? (
          <section className="py-0">
            <div className="container">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-2 ">
                {sortedProduct?.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white sm:rounded-lg hover:shadow-xl  shadow-sm  overflow-hidden"
                  >
                    <Link to={`/Productsdetail/${product.id}`}>
                      <div className=" w-full h-32 sm:h-44">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-32 sm:h-44 object-contain"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <h2 className="text-xs sm:text-lg font-bold line-clamp-1 text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-[10px]  sm:text-xs line-clamp-1 mt-2 text-gray-600">
                        {product.description}
                      </p>

                      <div className="flex justify-between mt-2">
                        <div className="flex items-center">
                          <span className=" text-[10px] sm:text-sm font-bold text-gray-800">
                            ₹
                            {product.price -
                              parseInt(
                                (product.price * product.discountPercentage) /
                                  100
                              )}
                          </span>
                          <span className="font-semibold text-[10px] sm:text-xs mx-1 sm:mx-2 line-through text-slate-900">
                            ₹{product.price}
                          </span>
                          <span className=" text-[8px] sm:text-xs leading-relaxed  text-orange-300">
                            ({product.discountPercentage}% off)
                          </span>
                        </div>
                        {/* Wishlist button for mobile*/}
                        <div className="rounded-full cursor-pointer text-center px-1">
                          {wishlist?.some((item) => item.id === product.id) ? (
                            <div className=" flex p-1 justify-center items-center w-full cursor-not-allowed opacity-50">
                              <i className="fa fa-heart text-sm text-rose-500"></i>
                            </div>
                          ) : (
                            <div
                              className="flex p-1 justify-center items-center w-full"
                              onClick={(e) => whishlistbtn(product.id, e)}
                            >
                              <i className="fa-regular fa-heart text-sm"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
            {sortedProduct?.map((product) => (
              <div
                key={product.id}
                className="sm:p-0 bg-white sm:rounded-lg hover:shadow-xl overflow-hidden"
                onMouseEnter={() => {
                  setIshover(true);
                  setIsHoverSetProduct(product.id);
                }}
                onMouseLeave={() => {
                  setIshover(false);
                  setIsHoverSetProduct(null);
                }}
              >
                <div className="h-[147px] sm:h-[194px] overflow-hidden">
                  {isHoverSetProduct === product.id && isHover ? (
                    <Link to={`/productsdetail/${product.id}`}>
                      <Slider {...settings} className="h-32 sm:h-44">
                        {product.images.map((image, index) => (
                          <div key={index}>
                            <img
                              src={image}
                              alt={`Product ${index}`}
                              className="w-full h-32 sm:h-44 object-contain"
                            />
                          </div>
                        ))}
                      </Slider>
                    </Link>
                  ) : (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-32 sm:h-44 object-contain"
                    />
                  )}
                </div>

                {isHoverSetProduct === product.id && isHover ? (
                  <div className="p-2 sm:p-4">
                    <div className="rounded-full cursor-pointer text-center px-1">
                      {wishlist?.some((item) => item.id === product.id) ? (
                        <div className="border flex px-20 p-1 justify-center items-center w-full cursor-not-allowed opacity-50">
                          <i className="fa fa-heart text-sm text-rose-500"></i>
                          <span className="text-[10px] ml-1 font-bold">
                            WISHLISTED
                          </span>
                        </div>
                      ) : (
                        <div
                          className="border flex px-20 p-1 justify-center items-center w-full"
                          onClick={(e) => whishlistbtn(product.id, e)}
                        >
                          <i className="fa-regular fa-heart text-sm"></i>
                          <span className="text-[10px] ml-1 font-bold">
                            WISHLIST
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-start text-xs py-3 text-gray-600">
                      <span>Category: {product.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex justify-center items-center text-xs sm:text-sm font-bold text-gray-800">
                        ₹
                        {product.price -
                          parseInt(
                            (product.price * product.discountPercentage) / 100
                          )}
                        <p className="text-[10px] mx-1 sm:text-xs sm:mx-2 line-through text-slate-400">
                          ₹{product.price}
                        </p>
                        <p className="text-[9px] sm:text-xs leading-relaxed text-orange-300">
                          ({Math.floor(product.discountPercentage)}% off)
                        </p>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 sm:p-4">
                    <Link to={`/productsdetail/${product.id}`}>
                      <h2 className="text-xs capitalize sm:text-sm font-bold line-clamp-1 text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-xs line-clamp-1 md:line-clamp-2 mt-2 text-gray-500">
                        {product.description}
                      </p>
                    </Link>
                    <div className="flex justify-between items-center sm:mt-3">
                      <span className="flex justify-center items-center text-xs sm:text-sm font-bold text-gray-800">
                        ₹
                        {product.price -
                          parseInt(
                            (product.price * product.discountPercentage) / 100
                          )}
                        <p className="text-[10px] mx-1 sm:text-xs sm:mx-2 line-through text-slate-400">
                          ₹{product.price}
                        </p>
                        <p className="text-[9px] sm:text-xs leading-relaxed text-orange-300">
                          ({Math.floor(product.discountPercentage)}% off)
                        </p>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Category;
