import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductItems from "./ProductItems";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isHover, setIshover] = useState(false);
  const [hoverSetProduct, setHoverSetProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { searchQuery } = useParams();
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

  const whishlistbtn = (productId, e) => {
    e.stopPropagation();
    const isInWishlist = wishlist?.some((item) => item.id === productId );
    
    console.log("productId::",productId);
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
      const updatedWishlist = products.find((product) => product.id === productId);
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
    <div>
      <section className="py-10 px-5 sm:px-10">
        <div className="container mx-auto py-10">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
              No products found
            </div>
          ) : (
            <ProductItems
              filteredProducts={filteredProducts}
              setIshover={setIshover}
              setHoverSetProduct={setHoverSetProduct}
              hoverSetProduct={hoverSetProduct}
              isHover={isHover}
              wishlist={wishlist}
              whishlistbtn={whishlistbtn}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchProduct;
