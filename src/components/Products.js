import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { settings } from "../Constants/header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [hoverSetProduct, setHoverSetProduct] = useState(null);
  const perPage = 30;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      const reversedProducts = data.products.reverse();
      setProducts(reversedProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const totalPages = Math.ceil(products.length / perPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      toast.error("Removed from wishlist", {
        style: {
          width: "200px",
          fontSize: "12px",
          float: "right",
          marginTop: "50px",
        },
      });

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      const updatedWishlist = products.find(
        (product) => product.id === productId
      );
      if (updatedWishlist) {
        setWishlist([...wishlist, updatedWishlist]);
        toast.success("Added to wishlist", {
          style: {
            width: "200px",
            fontSize: "12px",
            float: "right",
            marginTop: "50px",
          },
        });
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...wishlist, updatedWishlist])
        );
      }
    }
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="sm:container sm:mx-auto pt-16 sm:pt-20 pb-10">
      {isMobile ? (
        <section className="py-0">
          <div className="container">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-2 ">
              {products.slice(startIndex, endIndex).map((product) => (
                <div
                  key={product.id}
                  className="bg-white sm:rounded-lg hover:shadow-xl  shadow-lg overflow-hidden"
                >
                  <Link to={`/ProductsDetail/${product.id}`}>
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
                              (product.price * product.discountPercentage) / 100
                            )}
                        </span>
                        <span className="font-semibold text-[10px] sm:text-xs mx-1 sm:mx-2 line-through text-slate-900">
                          ₹{product.price}
                        </span>
                        <span className=" text-[8px] sm:text-xs leading-relaxed text-orange-300">
                          ({product.discountPercentage}% off)
                        </span>
                      </div>
                      {/* Wishlist button */}
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
          {products.slice(startIndex, endIndex).map((product) => (
            <div
              key={product.id}
              className="sm:p-0 bg-white sm:rounded-lg hover:shadow-xl overflow-hidden"
              onMouseEnter={() => {
                setIshover(true);
                setHoverSetProduct(product.id);
              }}
              onMouseLeave={() => {
                setIshover(false);
                setHoverSetProduct(null);
              }}
            >
              <div className="h-[147px] sm:h-[194px] overflow-hidden">
                {hoverSetProduct === product.id && isHover ? (
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

              {hoverSetProduct === product.id && isHover ? (
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
      {perPage ? (
        <div className="flex justify-center py-12">
          <button
            onClick={handlePrevPage}
            className={`mx-2 px-3 py-2 text-xs border rounded-full ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-angle-left "></i>
          </button>
          <span className="pt-2 text-xs">page {currentPage} </span>
          <button
            onClick={handleNextPage}
            className={`mx-2 px-3 py-2 text-xs border rounded-full
                      ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed text-gray-500"
                          : "bg-blue-500 text-white"
                      }`}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
