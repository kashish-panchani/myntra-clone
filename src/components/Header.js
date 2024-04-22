import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { headerlinks } from "../Constants/header";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      setSearchQuery("");
      navigate(`/searchproduct/${searchQuery}`);
    }
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
      setCount(parsedCartItems.length);
      // console.clear();
    }
  }, []);

  return (
    <>
      <div>
        <header className="overflow-hidden container bg-white shadow-md max-w-full z-10 fixed">
          <nav className="overflow-hidden bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="flex sm:mx-3 md:mx-4 lg:mx-5 xl:mx-8 flex-wrap justify-between items-center py-2">
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="../myntralogo.png"
                  className="h-8 xl:h-14 xl:w-22 lg:h-[40px] md:h-[32px] sm:h-[40px]"
                  alt="myntra Logo"
                />
              </Link>
              <div className="flex justify-center items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="flex items-center justify-center ">
                  <input
                    type="text"
                    placeholder="Search For Products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={searchEnter}
                    className="h-7 sm:h-8 pl-4 w-[120px] text-[9px] border border-r-0  sm:text-xs sm:w-[344px]  lg:w-[275px]  md:w-[152px]  xl:w-[390px] rounded-l-md text-gray-700 focus:outline-none"
                  />
                  <button className="border-l-0 w-10 h-7 sm:h-8 md:w-[35px] border rounded-r-md text-gray-300 ">
                    <i className="fas fa-search text-xs xl:text-[16px]"></i>
                  </button>
                  <div className="flex text-[12px] ml-2 md:mx-5 sm:ml-4 md:ml-6 xl:text-xl justify-center items-center lg:text-[16px]  md:text-[12px] sm:text-[17px]">
                    <div>
                      <Link to="/login">
                        <i className="fa-regular fa-user"></i>
                      </Link>
                    </div>

                    <Link
                      to="/wishlist"
                      className="text-gray-700  hover:text-gray-900"
                    >
                      <i className="far fa-heart mx-2  sm:mx-3 xl:mx-4 lg:mx-[12px] md:mx-[11px] "></i>
                    </Link>

                    <div className="relative ">
                      <Link
                        to="/cart"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        <i className="fas fa-shopping-cart "></i>
                        <span className="absolute bottom-3 right-2 text-[8px] w-3 h-3 bg-red-500 text-white rounded-full  xl:w-4 xl:h-4 xl:bottom-5 xl:right-4  xl:text-[11px] sm:w-4 sm:h-4 sm:bottom-4 sm:right-3 sm:text-[11px]  lg:w-[13px] lg:h-[13px] lg:right-3 lg:text-[9px] lg:bottom-4 md:bottom-[12px] md:right-[7px] md:text-[8px] md:w-3 md:h-3 flex items-center justify-center ">
                          {count}
                        </span>
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-flex items-center  sm:mx-2  h-10 w-[42px] sm:w-8 sm:h-10 justify-center text-gray-500 rounded-lg md:hidden focus:outline-none "
                    aria-controls="navbar-sticky"
                    aria-expanded={isMobileMenuOpen}
                  >
                    <svg
                      className="sm:w-5 sm:h-5 w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                className={`${
                  isMobileMenuOpen ? "block" : "hidden"
                } items-center justify-center w-full md:flex md:text-xs md:w-auto  md:order-1`}
                id="navbar-sticky"
              >
                <ul className="navbar flex flex-col p-4 xl:text-[14px] lg:text-[12px] md:text-[10px] mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-5 xl:space-x-7 lg:space-x-5 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  {headerlinks.map((el,index) => (
                    <li key={index}>
                      <Link
                        to={el.url}
                        className={`block py-2 px-3 rounded md:bg-transparent md:text-gray-900 md:p-0 ${
                          location.pathname === el.url ? "bg-gray-400" : ""
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {el.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
