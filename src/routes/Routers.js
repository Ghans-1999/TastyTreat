import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import  { useState, useEffect } from "react";

import Home from "../pages/Home";
import Pizzas from "../pages/Pizzas";
import PizzaDetails from "../pages/PizzaDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Collections from "../pages/Collections"
import Map from "../pages/MapComponent"

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pizzas" element={<Pizzas />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pizzas/:id" element={<PizzaDetails />} />
      <Route path="/collection/:category" element={<Collections/>} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
};

export default Routers;
