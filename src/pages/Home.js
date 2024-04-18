import React, { useEffect } from "react";
import hero from "../Images/heroooo.webp";
import herosec from "../Images/herosec.jpg";
import coupn from "../Images/coupn.webp";
import home3 from "../Images/home3.webp";
import home4 from "../Images/home5.webp";
import third from "../Images/third.webp";
import footerimg from "../Images/footeimage.webp";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="overflow-hidden ">
        <div className="">
          <Link to="/all">
            <div className="sm:flex pt-20 hidden  justify-center items-center ">
              <div>
                <img src={hero} alt="" className="" />
              </div>
            </div>
          </Link>

          <Link to="/all">
            <div className="flex pt-20 sm:hidden justify-center max-w-full items-center ">
              <div>
                <img src={herosec} alt="" className="object-contain" />
              </div>
            </div>
          </Link>
          <div>
            <img src={coupn} alt="" className="" />
          </div>

          <div className="flex justify-center items-center sm:mx-2 lg:mx-3">
            <div>
              <img src={home3} alt="" className="" />
            </div>
            <div>
              <img src={home4} alt="" className="" />
            </div>
          </div>

          <div className="flex">
            <img src={third} alt="" className="" />
          </div>
        </div>

        <div className="flex justify-center items-start py-10 text-sm  sm:text-2xl font-semibold overflow-hidden ">
          <h1>MEDAL WORTHY BRANDS TO BAG</h1>
        </div>
        <div className="grid  grid-cols-2 mx-2  sm:grid-cols-3 md:grid-cols-4 max-w-full  lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-2  overflow-hidden bg-white">
          <Link to="/CategoryFilter/mens-shoes">
            <div className="flex h-full   object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49792073334814.jpg"
                alt="shoes"
                className="w-full"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/womens-bags">
            <div className="flex h-full object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49733324931102.jpg"
                alt="women-bag"
                className="w-full"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/mens-shirts">
            <div className="flex h-full object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49739179622430.jpg"
                alt="men"
                className="w-full"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/mens-watches">
            <div className="flex h-full object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49792074317854.jpg"
                alt="watch"
                className="w-full"
              />
            </div>
          </Link>
          <Link to="/CategoryFilter/home-decoration">
            <div className="h-full object-cover overflow-hidden">
              <img
                src="https://assets.tatacliq.com/medias/sys_master/images/49792074711070.jpg"
                alt="home decor"
                className="w-full"
              />
            </div>
          </Link>
        </div>

        <div className="py-10 text-sm sm:text-2xl text-center font-semibold">
          <h1>Blockbuster Offers</h1>
        </div>
        <div className=" overflow-hidden sm:mx-5 md:mx-6 lg:mx-8 xl:mx-11">
          <div className="grid mx-4 sm:mx-2 sm:grid-cols-2 gap-2 sm:gap-4  ">
            <Link to="/CategoryFilter/womens-bags">
              <div className="flex xl:h-full object-cover overflow-hidden">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180343326.jpg"
                  alt="women-bag"
                  className="w-full"
                />
              </div>
            </Link>
            <Link to="/CategoryFilter/womens-watches ">
              <div className="flex xl:h-full object-cover overflow-hidden">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180408862.jpg"
                  alt="women-watch"
                  className="w-full"
                />
              </div>
            </Link>
            <Link to="/CategoryFilter/sunglasses">
              <div className="flex object-cover overflow-hidden">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180605470.jpg"
                  alt="sunglass"
                  className="w-full"
                />
              </div>
            </Link>
            <Link to="/CategoryFilter/womens-shoes">
              <div className="flex object-cover overflow-hidden">
                <img
                  src="https://assets.tatacliq.com/medias/sys_master/images/49739180736542.jpg"
                  alt="shoes"
                  className="w-full"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="my-3 flex justify-center    tems-center  overflow-hidden">
        <a href="https://www.myntra.com/shop/download-the-app">
          <img src={footerimg} alt="" className="max-w-[100%]" />
        </a>
      </div>
    </>
  );
};

export default HomePage;
