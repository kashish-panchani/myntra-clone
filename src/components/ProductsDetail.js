import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../components/CartContext";


const ProductsDetail = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const fetchProductDetails = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    setProducts(data);
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

  if (!products) {
    return <h1>error</h1>;
  }

  return (
    <>
      <div className="container mx-auto py-20 block md:flex md:justify-center">
        <div className="flex justify-center items-center w-full">
          <div
            className="mt-16 sm:ml-14 ml-4  sm:mt-24 absolute top-0 left-0"
          >
            <Link to="/">
                <i class="fa-solid fa-arrow-left  sm:text-base  text-xs mr-2"></i>

                <label
                  htmlFor="selectAll"
                  className="ml-1 sm:text-base text-xs text-slate-500 font-bold"
                >
                  Back
                </label>
              </Link>
          </div>
          <div className="p-4 flex-wrap grid xl:grid-cols-2 sm:mt-16 md:grid-cols-2 md:p-0 gap-2">
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
                addToCart(products);
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

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useToast from "../Customhook/useToast";
// import { useCart } from "../components/CartContext";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [itemToRemove, setItemToRemove] = useState(null);
//   const [showClearModal, setShowClearModal] = useState(false);
//   const [selectAll, setSelectAll] = useState([]);
//   const { success } = useToast();
//   const {
//     removeFromCart,

//     setSelectedItemCount,
//     selectedItemCount,
//   } = useCart();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const count = cartItems.filter((item) => item.checked).length;
//     setSelectedItemCount(count);
//   }, [cartItems]);
//   useEffect(() => {
//     const savedCartItems = localStorage.getItem("cartItems");
//     if (savedCartItems) {
//       const parsedCartItems = JSON.parse(savedCartItems);
//       setCartItems(parsedCartItems);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const decrease = (productId) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === productId
//         ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
//         : item
//     );
//     setCartItems(updatedCartItems);
//   };

//   const handleClearCart = () => {
//     const selectedItemsToRemove = cartItems.filter((item) => item.checked);
//     const updatedCartItems = cartItems.filter((item) => !item.checked);
//     setCartItems(updatedCartItems);
//     console.log("selectedItemsToRemove", selectedItemsToRemove);
//     removeFromCart(selectedItemsToRemove);
//     success("Selected items removed from cart");
//     closeClearModal();
//   };

//   const handleItemCheckboxChange = (productId) => {
//   const updatedCartItems = cartItems.map((item) =>
//     item.id === productId ? { ...item, checked: !item.checked } : item
//   );
//   setCartItems(updatedCartItems);

//   // Check if all items are selected after toggling an item's checkbox
//   const allItemsSelected = updatedCartItems.every((item) => item.checked);

//   // Update the selectAll state based on the result
//   setSelectAll(allItemsSelected);
// };

//   const handleCheckboxChange = () => {
//     const updatedCartItems = cartItems.map((item) => ({
//       ...item,
//       checked: !selectAll,
//     }));
//     setCartItems(updatedCartItems);
//     setSelectAll(!selectAll);
//     if (!selectAll) {
//       setSelectedItemCount(0);
//     } else {
//       setSelectedItemCount(
//         updatedCartItems.filter((item) => item.checked).length
//       );
//     }
//   };

//   const increase = (productId) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.id === productId
//         ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
//         : item
//     );
//     setCartItems(updatedCartItems);
//   };
//   const cartClose = (itemToRemove) => {
//     setItemToRemove(itemToRemove);
//   };

//   const handleRemove = () => {
//     const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
//     setCartItems(updatedCartItems);
//     removeFromCart(itemToRemove);
//     success("Product removed from cart");
//     setItemToRemove(null);
//   };

//   const handleCancelRemove = () => {
//     setItemToRemove(null);
//   };
//   const openClearModal = () => {
//     setShowClearModal(true);
//   };
//   const closeClearModal = () => {
//     setShowClearModal(false);
//   };

//   return (
//     <div>
//       <div className="container mx-auto xl:p-10 lg:p-12 md:p-10 sm:p-10 pt-7">
//         {cartItems.length === 0 ? (
//           <div className=" text-center px-6">
//             <div className="flex justify-center items-center">
//               <img
//                 src="../empty.svg"
//                 alt=""
//                 className="w-44 h-44 sm:w-60 sm:h-60 md:w-80 md:h-80"
//               />
//             </div>
//             <div>
//               <p className="font-bold text-base sm:text-2xl pb-2">
//                 Hey,it feels so light!
//               </p>
//               <p className="sm:text-base md:text-lg text-xs text-gray-400">
//                 There is nothing in your cart.Let's add some items.
//               </p>
//             </div>
//             <div>
//               <Link to="/wishlist">
//                 <button className="border border-blue-800  rounded-md py-3 px-3 text-[10px] sm:text-sm sm:px-6 sm:py-5 md:px-8 md:py-5 md:text-xl xl:px-10 xl:text-lg xl:py-4 m-10 text-blue-600 font-bold">
//                   ADD ITEMS FROM WISHLIST
//                 </button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="mt-16 mb-5 flex justify-between">
//               <div className="xl:ml-[106px] ml-5">
//                 <input
//                   type="checkbox"
//                   checked={selectAll}
//                   onChange={handleCheckboxChange}
//                 />
//                 <label
//                   htmlFor="selectAll"
//                   className="ml-1 text-[10px] sm:text-sm  text-slate-500 font-bold"
//                 >
//                   {selectedItemCount}/{cartItems.length} ITEMS SELECTED
//                 </label>
//               </div>
//               <button
//                 className="rounded-md xl:mr-24 text-[10px]  sm:text-[11px] text-slate-500 font-bold"
//                 onClick={openClearModal}
//                 disabled={selectedItemCount === 0}
//               >
//                 REMOVE
//               </button>
//             </div>
//             {showClearModal && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white p-3 sm:p-6 w-60 sm:w-80 text-gray-500 rounded-lg shadow-lg">
//                   <p className="text-xs sm:text-base font-semibold mb-4">
//                     Are you sure you want to remove all items from cart.
//                   </p>
//                   <hr />
//                   <div className="flex justify-between items-center text-[10px] sm:text-xs mx-8 mt-2 font-semibold">
//                     <button
//                       className="text-red-600 rounded-lg"
//                       onClick={handleClearCart}
//                     >
//                       REMOVE
//                     </button>
//                     |
//                     <button
//                       className="text-black rounded-lg"
//                       onClick={closeClearModal}
//                     >
//                       CANCEL
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="mx-auto max-w-5xl justify-center md:flex md:space-x-2 xl:px-0">
//               <div className="rounded-lg md:w-2/3">
//                 {cartItems.map((item, inx) => (
//                   <div key={inx}>
//                     <div className="responsive bottom-2 flex justify-between mb-1 sm:mb-2 border bg-white sm:rounded-lg sm:p-4 p-5  ">
//                       <input
//                         type="checkbox"
//                         checked={item.checked || selectAll}
//                         onChange={() => handleItemCheckboxChange(item.id)}
//                         className="absolute mt-5 sm:mt-0 sm:p-1 custom-checkbox"
//                       />
//                       <img
//                         src={item.thumbnail}
//                         alt="product-image"
//                         className="w-[100px] h-[100px]
//                     xl:w-44 lg:w-36 mt-5 sm:mt-0 md:w-32
//                       sm:w-40 object-cover  sm:object-contain xl:h-44 lg:h-36  md:h-32 sm:h-40"
//                       />

//                       <div className="ml-4 flex xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[66%] w-[100%] sm:justify-between">
//                         <div className="mt-6 sm:mt-0">
//                           <Link to={`/productsdetail/${item.id}`}>
//                             <h2 className="text-[12px] xl:text-lg lg:text-base md:text-[14px] sm:text-[13px] font-bold text-gray-900">
//                               {item.title}
//                             </h2>
//                           </Link>
//                           <p className="my-2 text-[12px] xl:text-sm lg:text-[13px] md:text-[12px]  sm:text-[12px] text-gray-700">
//                             {item.category}
//                           </p>
//                           <p className="my-2 text-[11px] xl:text-[13px] lg:text-[11px] md:text-[12px] sm:text-[10px] line-clamp-1 text-gray-700">
//                             {item.description}
//                           </p>
//                           <p className="my-2 text-[10px] xl:text-[14px] lg:text-[12px] md:text-[11px] sm:text-[10px] font-bold">
//                             <i className="fa-solid fa-indian-rupee-sign text-gray-500 xl:text-[12px] lg:text-[11px]"></i>
//                             {item.price -
//                               parseInt(
//                                 (item.price * item.discountPercentage) / 100
//                               )}{" "}
//                             <label htmlFor="" className="text-green-600">
//                               (Discount price)
//                             </label>
//                           </p>
//                           <div className="flex items-center border-gray-100">
//                             <span
//                               className={`border  bg-slate-200 w-3 h-4 text-[10px] px-1 xl:px-2 xl:w-6 xl:h-6 xl:text-sm lg:w-5 lg:h-5 lg:px-2  lg:text-[13px] md:w-4 md:h-4 md:px-1 md:text-[10px] sm:w-3 sm:h-5 sm:px-2 sm:text-[12px] hover:bg-slate-100  ${
//                                 item.quantity <= 1 ? "cursor-not-allowed" : ""
//                               }`}
//                               disabled={item.quantity <= 1}
//                               onClick={() => decrease(item.id)}
//                             >
//                               {" "}
//                               -{" "}
//                             </span>
//                             <span className="w-4 h-4 text-[10px] xl:w-6 xl:h-6 xl:py-0 lg:w-5 lg:h-5 lg:px-1  lg:text-[12px] lg:py-0 md:h-4 md:w-4 md:text-[10px] md:px-1 md:py-0 sm:text-[10px] sm:px-[2px] sm:py-[2px] sm:h-5 border bg-white text-center xl:text-base ">
//                               {item.quantity}
//                             </span>
//                             <span
//                               className={`border  bg-slate-200 w-3 h-4 text-[10px] px hover:bg-slate-100 xl:px-1 xl:w-6 xl:text-sm xl:h-6 lg:w-5 lg:h-5 lg:px-1  lg:text-[13px]  md:w-4 md:h-4 md:px-1 md:text-[10px] sm:w-4 sm:h-5 sm:px-1 sm:text-[12px]   ${
//                                 item.quantity >= 10 ? "cursor-not-allowed" : ""
//                               }`}
//                               disabled={item.quantity >= 10}
//                               onClick={() => increase(item.id)}
//                             >
//                               {" "}
//                               +{" "}
//                             </span>
//                           </div>
//                         </div>

//                         <div className=" absolute right-2 sm:relative mt-[22px] sm:right-1 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 ">
//                           <div className="sm:absolute ">
//                             <button
//                               className="text-[13px] xl:text-xl lg:text-base md:text-sm sm:text-[13px]"
//                               onClick={() => {
//                                 cartClose(item);
//                               }}
//                             >
//                               <i className="fa-solid fa-xmark "></i>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <Link to="/wishlist">
//                   <div className="border sm:rounded-lg text-xs sm:text-sm p-4 hover:underline flex justify-between items-center font-semibold">
//                     <div className="flex">
//                       <i className="fa-regular fa-bookmark mr-2 text-sm"></i>
//                       <h1> Add More From Wishlist</h1>
//                     </div>

//                     <div>
//                       <i className="fa-solid fa-greater-than text-xs"></i>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//               <div className="my-2 sm:my-0 sm:mt-6 h-full sm:rounded-lg border bg-white py-6 px-4 md:mt-0 md:w-1/3">
//                 <div className="mb-2 flex justify-between">
//                   <p className="text-gray-700  font-bold">Subtotal</p>
//                   <p className="text-gray-700"></p>₹
//                   {cartItems.reduce(
//                     (total, item) =>
//                       total +
//                       item.quantity *
//                         (item.price -
//                           parseInt(
//                             (item.price * item.discountPercentage) / 100
//                           )),
//                     0
//                   )}
//                 </div>
//                 <div className="flex justify-between">
//                   <p className="text-gray-700 text-[15px]">Shipping</p>
//                   <p className="text-gray-700 text-[15px]">Free</p>
//                 </div>
//                 <div className="py-2">
//                   <p className="text-gray-700 text-[15px]">Platform fee:</p>
//                   <p className="text-gray-700 text-[15px]">Free</p>
//                 </div>
//                 <hr className="my-4" />
//                 <div className="flex justify-between">
//                   <p className="text-base font-bold">Total Amount:</p>

//                   <p className="mb-1 text-[15px] font-bold">
//                     {" "}
//                     ₹
//                     {cartItems.reduce(
//                       (total, item) =>
//                         total +
//                         item.quantity *
//                           (item.price -
//                             parseInt(
//                               (item.price * item.discountPercentage) / 100
//                             )),
//                       0
//                     )}
//                   </p>
//                   {itemToRemove && (
//                     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                       <div className="bg-white p-3 sm:p-6 w-60 sm:w-80 text-gray-500 rounded-lg shadow-lg">
//                         <p className="text-xs sm:text-base font- mb-4">
//                           Are you sure you want to remove this item from the
//                           cart?
//                         </p>
//                         <hr />
//                         <div className="flex justify-between items-center text-[11px] sm:text-base mx-8 mt-2 font-semibold">
//                           <button
//                             className=" text-rose-500  rounded-lg "
//                             onClick={handleRemove}
//                           >
//                             Remove
//                           </button>
//                           |
//                           <button
//                             className=" text-black rounded-lg"
//                             onClick={handleCancelRemove}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React, { createContext, useContext, useEffect, useState } from "react";
// import useToast from "../Customhook/useToast";

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(
//     JSON.parse(localStorage.getItem("cartItems")) || []
//   );
//   const [wishlist, setWishlist] = useState(
//     JSON.parse(localStorage.getItem("wishlist")) || []
//   );
//   const [selectedItemCount, setSelectedItemCount] = useState(0);
//   const [cartItemsCount, setCartItemsCount] = useState(cartItems.length);
//   const { success } = useToast();
//   console.log("cartItemsCount", cartItemsCount);
//   useEffect(() => {
//     setCartItemsCount(cartItems.length);
//   }, [cartItems]);

//   console.log(cartItems);

//   useEffect(() => {
//     const count = cartItems.filter((item) => item.checked).length;
//     setSelectedItemCount(count);
//   }, [cartItems]);
//   const addToCart = (products) => {
//     const isAlreadyInCart = cartItems.some((item) => item.id === products.id);
//     const maxQuantity = 10;
//     const productWithQuantity = { ...products, quantity: 1, checked: true };
//     if (!isAlreadyInCart && cartItems.length < maxQuantity) {
//       setCartItems([...cartItems, productWithQuantity]);
//       localStorage.setItem(
//         "cartItems",
//         JSON.stringify([...cartItems, productWithQuantity])
//       );
//       success("Item added to cart.");
//     }
//   };

//   const moveToCart = (product) => {
//     const isInCart = cartItems.some((item) => item.id === product.id);
//     if (isInCart) {
//       const updatedCartItems = cartItems.map((item) =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + 1, checked: true }
//           : item
//       );
//       setCartItems(updatedCartItems);
//       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     } else {
//       const updatedCartItems = [
//         ...cartItems,
//         { ...product, quantity: 1, checked: true },
//       ];
//       setCartItems(updatedCartItems);
//       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     }
//     const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
//     setWishlist(updatedWishlist);
//     success("Item moved to cart successfully");
//   };

//   const removeFromCart = (productsToRemove) => {
//     let updatedCartItems;
//     if (Array.isArray(productsToRemove)) {
//       updatedCartItems = cartItems.filter(
//         (item) => !productsToRemove.some((product) => product.id === item.id)
//       );
//     } else {
//       updatedCartItems = cartItems.filter(
//         (item) => item.id !== productsToRemove.id
//       );
//     }
//     setCartItems(updatedCartItems);
//     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
//     setCartItemsCount(updatedCartItems.length);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         cartItemsCount,
//         moveToCart,
//         removeFromCart,
//         setSelectedItemCount,
//         selectedItemCount,
//         setCartItemsCount,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
