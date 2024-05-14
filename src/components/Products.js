import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { settings } from "../Constants/header";
import useToast from "../hook/useToast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [hoverSetProduct, setHoverSetProduct] = useState(null);
  const [sortedProduct, setSortedProduct] = useState(null);

  const perPage = 30;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { success, error } = useToast();
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

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

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
    if (products.length > 0) {
      setSortedProduct([...products]);
    }
  }, [products]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    const updateWishlist = () => {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    };

    window.addEventListener("storage", updateWishlist);

    return () => {
      window.removeEventListener("storage", updateWishlist);
    };
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

  const sortedProducts = (value) => {
    switch (value) {
      case "better_discount":
        setSortedProduct(
          [...products].sort(
            (a, b) => (b.price - (b.price * b.discountPercentage) / 100) - (a.price - (a.price * a.discountPercentage) / 100)
          )
        );
        break;
      case "price_high_to_low":
        setSortedProduct([...products].sort((a, b) => (b.price - (b.price * b.discountPercentage) / 100) - (a.price - (a.price * a.discountPercentage) / 100)));
        break;
      case "price_low_to_high":
        setSortedProduct([...products].sort((a, b) => (a.price - (a.price * a.discountPercentage) / 100) - (b.price - (b.price * b.discountPercentage) / 100)));
        break;
      case "customer_rating":
        setSortedProduct([...products].sort((a, b) => b.rating - a.rating));
        break;
      default:
        setSortedProduct([...products]);
        break;
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

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="sm:container sm:mx-auto pt-16 sm:pt-20 pb-10">
      <div className="flex justify-end">
        <div className="border border-slate-200 sm:mb-8 mr-2 m-2">
          <label className="p-2 text-xs sm:text-[13px] text-gray-500 ">Sort by:</label>
          <select
            className="p-2 w-[245px] font-bold text-xs text-gray-500 sm:text-[13px] sm:w-[12rem] outline-none bg-white"
            onChange={(e) => sortedProducts(e.target.value)}
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
              {sortedProduct?.slice(startIndex, endIndex).map((product) => (
                <div
                  key={product.id}
                  className="bg-white sm:rounded-lg hover:shadow-xl  shadow-sm overflow-hidden"
                >
                  <Link to={`/ProductsDetail/${product.id}`} target="_blank">
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
          {sortedProduct?.slice(startIndex, endIndex).map((product) => (
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
//old productdetails code
// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useCart } from "../components/CartContext";


// const ProductsDetail = () => {
//   const { id } = useParams();
//   const { addToCart, cartItems } = useCart();
//   const [products, setProducts] = useState(null);
//   const [wishlist, setWishlist] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const fetchProductDetails = async () => {
//     const response = await fetch(`https://dummyjson.com/products/${id}`);
//     const data = await response.json();
//     setProducts(data);
//   };

//   useEffect(() => {
//     fetchProductDetails();
//   }, [id]);

//   useEffect(() => {
//     const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(savedWishlist);
//   }, []);

//   const whishlistbtn = (productId, e) => {
//     e.stopPropagation();
//     if (!isLoggedIn) {
//       navigate("/login");
//       return;
//     }
//     const isInWishlist = wishlist.some((item) => item.id === productId);
//     const updatedWishlist = isInWishlist
//       ? wishlist.filter((item) => item.id !== productId)
//       : [...wishlist, products];
//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//     toast[isInWishlist ? "error" : "success"](
//       isInWishlist ? "Removed from wishlist" : "Added to wishlist",
//       {
//         style: {
//           width: "200px",
//           fontSize: "12px",
//           float: "right",
//           marginTop: "50px",
//         },
//       }
//     );
//   };
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     setIsLoggedIn(isLoggedIn === "true");
//   }, []);
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (isLoggedIn === "true") {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   if (!products) {
//     return <h1>error</h1>;
//   }

//   return (
//     <>
//       <div className="container mx-auto py-20 block md:flex md:justify-center">
//         <div className="flex justify-center items-center w-full">
//           <div
//             className="mt-16 sm:ml-14 ml-4  sm:mt-24 absolute top-0 left-0"
//           >
//             <Link to="/">
//                 <i class="fa-solid fa-arrow-left  sm:text-base  text-xs mr-2"></i>

//                 <label
//                   htmlFor="selectAll"
//                   className="ml-1 sm:text-base text-xs text-slate-500 font-bold"
//                 >
//                   Back
//                 </label>
//               </Link>
//           </div>
//           <div className="p-4 flex-wrap grid xl:grid-cols-2 sm:mt-16 md:grid-cols-2 md:p-0 gap-2">
//             {products.images.map((image, index) => (
//               <div
//                 key={index}
//                 className="w-full xl:w-[350px] xl:h-[350px] lg:w-[290px] lg:h-[290px] md:w-[200px] md:h-[200px] border "
//               >
//                 <img
//                   src={image}
//                   alt="image"
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col px-4 sm:px-16 gap-3 xl:gap-5 lg:gap-4 md:gap-2 sm:gap-3 md:px-0 py-5 md:py-20 xl:w-2/3  md:w-[41%]">
//           <div className="flex flex-col gap-2  xl:gap-5 lg:gap-4 md:gap-3 sm:gap-3 ">
//             <h1 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-xl text-lg  font-bold">
//               {products.title}
//             </h1>
//             <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-base text-sm font-normal">
//               {products.category}
//             </h1>
//             <h1 className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm font-normal">
//               {products.description}
//             </h1>
//             <p className="text-gray-400 xl:text-xl lg:text-lg md:text-sm sm:text-sm text-sm leading-relaxed font-normal">
//               {products.brand}
//             </p>
//             <div className="border border-gary-200 w-14 text-xs    flex items-center font-bold justify-evenly">
//               {products.rating}{" "}
//               <i className="fa-solid fa-star mt-1 text-xs text-teal-500"></i>
//             </div>
//             <hr />
//           </div>

//           <div className="flex items-center my-1 xl:text-2xl   font-bold text-black">
//             <p className="xl:text-2xl lg:text-lg md:text-sm sm:text-sm text-xs font-bold">
//               ₹
//               {products.price -
//                 (
//                   (products.price * products.discountPercentage) /
//                   100
//                 ).toFixed()}
//             </p>
//             <p className="text-xs xl:text-xl lg:text-base md:text-sm sm:text-sm opacity-40 font-normal px-2 leading-relaxed line-through">
//               ₹{products.price}
//             </p>
//             <span className="opacity-40 text-xs  xl:text-xl lg:text-sm  md:text-sm sm:text-sm font-normal">
//               {" "}
//               MRP
//             </span>{" "}
//             <p className=" text-xs xl:text-lg leading-relaxed lg:text-sm md:text-sm sm:text-sm font-bold px-2 text-red-400">
//               ({products.discountPercentage}% off)
//             </p>
//           </div>
//           <div>
//             <p className="text-sm xl:text-xl lg:text-lg md:text-sm sm:text-base leading-relaxed ">
//               <label htmlFor="" className="text-teal-600 font-semibold">
//                 In stock :{" "}
//               </label>
//               {products.stock}
//             </p>
//           </div>
//           <div className="text-teal-600 font-bold text-sm xl:text-xl lg:text-base md:text-sm sm:text-sm ">
//             inclusive of all taxes
//           </div>

//           <div className="flex flex-row gap-1 w-60 sm:w-72 h-10 lg:w-96">
//             <button
//               className="text-[10px] xl:text-base  lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold bg-[#ff3e6c] border border-[#ff3e6c] text-white flex-1 text-center mr-3 w-32"
//               onClick={() => {
//                 addToCart(products);
//               }}
//             >
//               {cartItems.some((item) => item.id === products.id) ? (
//                 <Link to="/cart" className="text-white">
//                   GO TO CART <i className="fa-solid fa-arrow-right ml-1"></i>
//                 </Link>
//               ) : (
//                 "ADD TO CART"
//               )}
//             </button>

//             {wishlist?.some((item) => item.id === products.id) ? (
//               <div className="text-[10px] xl:text-base cursor-not-allowed flex justify-center items-center py-1   lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold  border flex-1 text-center mr-3 w-32">
//                 <i className="fa fa-heart sm:text-base  text-rose-500"></i>
//                 <span className=" ml-1 font-bold">WISHLISTED</span>
//               </div>
//             ) : (
//               <div
//                 className="text-[10px] xl:text-base  flex justify-center items-center lg:text-sm md:text-xs sm:text-xs rounded-none sm:px-4  md:py-3 md:px-4 lg:h-16 font-bold  border flex-1 text-center mr-3 w-32"
//                 onClick={(e) => whishlistbtn(products.id, e)}
//               >
//                 <i className="fa-regular fa-heart sm:text-sm"></i>
//                 <span className=" ml-1 font-bold">WISHLIST</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductsDetail;