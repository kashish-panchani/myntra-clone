


import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Update import
import App from "./App";
import { CartProvider } from "./components/CartContext";

ReactDOM.render(
  <>
    <BrowserRouter> {/* Wrap App with BrowserRouter here */}
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);