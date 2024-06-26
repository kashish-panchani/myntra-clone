import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { settings } from "../Constants/header";

const ProductItems = (props) => {
  const {isMobile,
    filteredProducts,
    setIshover,
    setIsHoverSetProduct,
    isHoverSetProduct,
    isHover,
    wishlist,
    whishlistbtn,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="sm:container sm:mx-auto pt-16 sm:pt-20 pb-10">
    {isMobile ? (
      <section className="py-0">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-2 ">
            {filteredProducts.map((product) => (
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
        {filteredProducts.map((product) => (
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
  );
};

export default ProductItems;
