import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import { settings } from "../Constants";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(null);
  const perPage = 30;
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/products?limit=0`);
      const data = await response.json();
      setProducts(data.products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
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
  

  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    localStorage.setItem("selectedProduct", JSON.stringify(product));
  });

  const selectThumbnail = (image) => {
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      thumbnail: image,
    }));
  };

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
          marginTop: "35px",
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

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-100 overflow-hidden min-h-screen">
     

      <section className="py-0   sm:px-10">
        <div className="container mx-auto sm:pt-24 pt-16">
        
          
          
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-2 ">
              {products.slice(startIndex, endIndex).map((product) => (
                <div
                  key={product.id}
                  className="bg-white sm:rounded-lg hover:shadow-xl  shadow-lg overflow-hidden"
                  onClick={() => openModal(product)}
                >
                  <div
                    className="h-64  overflow-hidden"
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
                              className="h-full w-full object-cover sm:object-contain"
                              onClick={() => selectThumbnail(image)}
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-[90%] sm:h-full sm:w-full object-cover sm:object-contain"
                      />
                    )}
                  </div>

                  <div className="p-4">
                     <Link to={`/ProductsDetail/${product.id}`}>
                      <h2 className="text-xs sm:text-lg font-bold line-clamp-1 text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-[10px]  sm:text-xs line-clamp-1 mt-2 text-gray-600">
                        {product.description}
                      </p>
                    </Link>
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
                        <span className=" text-[8px] sm:text-xs leading-relaxed font- text-red-500">
                          ({product.discountPercentage}% off)
                        </span>
                      </div>
                      {/* Wishlist button */}
                      <div
                        className={` sm:rounded-full text-center sm:px-2  sm:py-1 ${
                          wishlist?.some((item) => item.id === product.id)
                            ? "sm:bg-gray-300"
                            : "sm:bg-transparent sm:border sm:border-gray-300"
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
      </section>

      {!searchTerm || filteredProducts.length > perPage ? (
        <div className="flex justify-center py-12">
          <button
            onClick={handlePrevPage}
            className={`mx-2 px-3 py-2  text-xs border rounded-full ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            disabled={currentPage === 1}
          >
            <i class="fa-solid fa-angle-left "></i>
          </button>
          <span className="pt-2 text-xs">page {currentPage} </span>
          <button
            onClick={handleNextPage}
            className={`mx-2 px-3 py-2  text-xs border rounded-full
                      ${
                        currentPage === totalPages
                          ? "bg-gray-300 cursor-not-allowed text-gray-500"
                          : "bg-blue-500 text-white"
                      }`}
            disabled={currentPage === totalPages}
          >
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Products;
