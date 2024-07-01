import React from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col,Button } from "reactstrap";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import guyImg from "../assets/images/delivery-guy.png";
import "../styles/hero-section.css";
import location from "../assets/images/location.png";

import FoodCarousel from "../components/FoodCarousel.jsx";

const Home = () => {
  return (
    <Helmet title="Home">
      <section>
  <Container>
    <Row>
      <Col md={6} lg={6}>
        <div className="hero__content">
          <h5 className="mb-3">Easy way to make an order</h5>
          <h1 className="mb-4 hero__title">
            <span>HUNGRY?</span> Just wait <br /> food at <span>your door</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui magni delectus tenetur autem, sint veritatis!
          </p>
          <div className="hero__btns d-flex align-items-center gap-5 mt-4">
            <button className="order__btn d-flex align-items-center justify-content-between">
              Order now <i className="ri-arrow-right-s-line" />
            </button>
          </div>
          <div className="hero__service d-flex align-items-center gap-5 mt-5">
            <p className="d-flex align-items-center gap-2">
              <span className="shipping__icon">
                <i className="ri-car-line" />
              </span>
              No shipping charge
            </p>
            <p className="d-flex align-items-center gap-2">
              <span className="shipping__icon">
                <i className="ri-shield-check-line" />
              </span>
              100% secure checkout
            </p>
          </div>
        </div>
      </Col>
      <Col md={6} lg={6}>
        <div className="hero__img">
          <img src={location} alt="hero-img" className="w-100" />
        </div>
      </Col>
    </Row>
  </Container>
</section>
<FoodCarousel/>
    </Helmet>
  );
};

export default Home;
