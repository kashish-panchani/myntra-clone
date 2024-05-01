import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductItems from "./ProductItems";
import useToast from "../Customhook/useToast";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { searchQuery } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { success, error } = useToast();
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
      setProducts(data.products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product?.title.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);
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

  return (
    <div>
      <div className="container mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
            No products found
          </div>
        ) : (
          <ProductItems
            filteredProducts={filteredProducts}
            setIshover={setIshover}
            setIsHoverSetProduct={setIsHoverSetProduct}
            isHoverSetProduct={isHoverSetProduct}
            isHover={isHover}
            wishlist={wishlist}
            whishlistbtn={whishlistbtn}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
