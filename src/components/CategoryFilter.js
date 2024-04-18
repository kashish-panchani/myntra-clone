import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Header from "./Header";
import ProductItems from "./ProductItems";
import { productmodal, settings } from "../Constants";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";

const CategoryFilter = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const [filterCategory, setfilterCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const categorys = products.filter((product) => product.category === type);
    setfilterCategory(categorys);
  }, [products, type]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
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
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setWishlist([...wishlist, productToAdd]);
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
          JSON.stringify([...wishlist, productToAdd])
        );
      }
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  };

  const selectThumbnail = (image) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      thumbnail: image,
    }));
  };

  return (
    <>
      <div className="overflow-hidden sm:container sm:mx-auto pt-16 sm:pt-24 pb-10">
        <div className="overflow-hidden grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
          {filterCategory.map((product) => (
            <div
              key={product.id}
              className=" sm:p-0  bg-white sm:border sm:rounded-lg shadow-lg overflow-hidden"
              onClick={() => openModal(product)}
            >
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
                          className="h-full w-full onject-cover sm:object-contain"
                          onClick={() => selectThumbnail(image)}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-[90%] sm:h-full sm:w-full onject-cover sm:object-contain"
                  />
                )}
              </div>

              <div className="p-2 sm:p-4">
                 <Link to={`/ProductsDetail/${product.id}`}>
                  <h2 className="text-xs  sm:text-base  font-bold line-clamp-1 text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-xs sm:text-sm line-clamp-1 md:line-clamp-2 mt-2 text-gray-600">
                    {product.description}
                  </p>
                </Link>
                <div className="flex justify-between items-center sm:mt-3">
                  <p className="flex justify-center items-center text-xs sm:text-sm font-bold text-gray-800">
                    ₹
                    {product.price -
                      parseInt(
                        (product.price * product.discountPercentage) / 100
                      )}
                    <p class="font-semibold text-[10px] mx-1 sm:text-sm sm:mx-2 line-through text-slate-900">
                      ₹{product.price}
                    </p>
                    <p className="text-[9px] sm:text-xs leading-relaxed  text-orange-300">
                      ({product.discountPercentage}% off)
                    </p>
                  </p>

                  {/* Wishlist button */}
                  <div
                    className={`sm:rounded-full text-center px-2 py-1 ${
                      wishlist?.some((item) => item.id === product.id)
                        ? "sm:bg-gray-300"
                        : "bg-transparent sm:border sm:border-gray-300"
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
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
