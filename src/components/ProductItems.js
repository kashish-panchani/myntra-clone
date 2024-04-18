import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { productmodal, settings } from "../Constants";

const ProductItems = (props) => {
  const {
    openModal,
    setSearchTerm,
    filteredProducts,
    setIshover,
    setIsHoverSetProduct,
    isHoverSetProduct,
    isHover,
    selectThumbnail,
    wishlist,
    whishlistbtn,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-wrap -m-4 pt-10">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="p-4 sm:w-1/2 md:w-1/3 lg:w-1/4 "
          onClick={() => productmodal(product,openModal,setSearchTerm)}
        >
          <div className="bg-white border hover:shadow-xl rounded-lg shadow-lg overflow-hidden">
             <Link to={`/ProductsDetail/${product.id}`}>
              <div
                className="h-64 overflow-hidden"
                onMouseEnter={() => {
                  setIshover(true);
                  setIsHoverSetProduct(product.id);
                }}
                onMouseLeave={() => setIshover(false)}
              >
                {isHoverSetProduct === product.id && isHover ? (
                  <Slider {...settings}>
                    {product.images.map((image, index) => (
                      <div key={index} className="h-[232px]">
                        <img
                          src={image}
                          alt={`Product ${index}`}
                          className="h-full w-full object-contain"
                          onClick={() => selectThumbnail(image)}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-bold line-clamp-1 text-gray-800">
                {product.title}
              </h2>
              <p className="text-xs line-clamp-1 mt-2 text-gray-600">
                {product.description}
              </p>
              <div className="flex  justify-between  mt-3">
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-800">
                    ₹
                    {product.price -
                      parseInt(
                        (product.price * product.discountPercentage) / 100
                      )}
                  </span>
                  <span class="font-semibold text-xs mx-2 line-through text-slate-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xs leading-relaxed font- text-red-500">
                    ({product.discountPercentage}% off)
                  </span>
                </div>
                {/* Wishlist button */}
                <div
                  className={`rounded-full text-center px-2 py-1 ${
                    wishlist?.some((item) => item.id === product.id)
                      ? "bg-gray-300"
                      : "bg-transparent border border-gray-300"
                  }`}
                  onClick={(e) => whishlistbtn(product.id, e)}
                >
                  {wishlist?.some((item) => item.id === product.id) ? (
                    <i className="fas fa-heart text-rose-500"></i>
                  ) : (
                    <i className="far fa-heart text-gray-500"></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItems;
