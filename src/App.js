import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductsDetail from "./components/ProductsDetail";
import HomePage from "./pages/Home";
import Footer from "./components/Footer";
import ErrorPage from "./pages/Error";
import Category from "./components/Category";
import Header from "./components/Header";
import SearchProduct from "./components/SearchProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (

    <BrowserRouter>
      <Header />
      <ToastContainer autoClose={2000} />
     
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/all" exact element={<Products />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/wishlist" exact element={<Wishlist />} />
        <Route path="/productsdetail/:id" exact element={<ProductsDetail />} />
        <Route path="/category/:type" exact element={<Category />} />
        <Route path="/*" exact element={<ErrorPage />} />
        <Route
          path="/searchproduct/:searchQuery"
          exact
          element={<SearchProduct />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
