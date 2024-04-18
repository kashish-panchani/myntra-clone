import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductItems from "./ProductItems";
import { productmodal } from "../Constants";
import { useParams } from "react-router-dom";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isHover, setIshover] = useState(false);
  const [isHoverSetProduct, setIsHoverSetProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { searchTerm } = useParams();
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
      product?.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
    <div>
      <section className="py-10 px-5 sm:px-10">
        <div className="container mx-auto py-10">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-36  text-sm sm:text-2xl font-semibold">
              No products found
            </div>
          ) : (
            <ProductItems 
              productmodal={productmodal}
              filteredProducts={filteredProducts}
              setIshover={setIshover}
              setIsHoverSetProduct={setIsHoverSetProduct}
              isHoverSetProduct={isHoverSetProduct}
              isHover={isHover}
              selectThumbnail={selectThumbnail}
              wishlist={wishlist}
              whishlistbtn={whishlistbtn}
              openModal={openModal}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchProduct;
