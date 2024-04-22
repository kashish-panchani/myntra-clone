import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { settings } from "../Constants/header";

const Category = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const [filterCategoryProducts, setfilterCategoryProducts] = useState([]);

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

  return (
    <>
      <div className="sm:container sm:mx-auto pt-16 sm:pt-28 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
          {filterCategoryProducts.map((product) => (
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
              <div className="h-[147px] sm:h-[194px] overflow-hidden ">
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
                <div className="p-2 sm:p-4 ">
                  <div
                    className="rounded-full cursor-pointer text-center px-1"
                    onClick={(e) => whishlistbtn(product.id, e)}
                  >
                    <div className="border flex px-20 p-1 justify-center items-center w-full">
                      {wishlist?.some((item) => item.id === product.id) ? (
                        <i className="fa fa-heart text-sm text-rose-500"></i>
                      ) : (
                        <i className="fa-regular fa-heart text-sm"></i>
                      )}

                      <span className="text-[10px] ml-1 font-bold">
                        {wishlist?.some((item) => item.id === product.id)
                          ? "WISHLISTED"
                          : "WISHLIST"}
                      </span>
                    </div>
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
                  <h2 className="text-xs capitalize sm:text-sm font-bold line-clamp-1 text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-xs line-clamp-1 md:line-clamp-2 mt-2 text-gray-500">
                    {product.description}
                  </p>

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
      </div>
    </>
  );
};

export default Category;
