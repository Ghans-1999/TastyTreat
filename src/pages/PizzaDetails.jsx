import React, { useState, useEffect } from "react";

//import products from "../assets/fake-data/products";
import { useParams, useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ExtraIngredient from "../components/ExtraIngredient/ExtraIngredient.jsx";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import "../styles/product-details.css";
import "../styles/product-card.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import { Client, ID, account, promise } from "../lib/appwrite.js";

const ExtraIngredients = {
  MUSHROOMS: "Mushrooms",
  ONION: "Onion",
  PEPPER: "Pepper",
  PINAPPLE: "Pinapple",
  TUNA: "Tuna",
  MEAT: "Meat",
  CHEESE: "Cheese",
  HOTSAUCE: "Hot Sauce",
  CORN: "Corn",
};

const PizzaDetails = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState({}); // Initialize with an empty object
  const [products, setProducts] = useState([]);
  let productsOut;

  useEffect(() => {
    promise
      .then((response) => {
        const products = response.documents;
        productsOut = response.documents;
        const product = products.find((product) => product.id === id);
        setProduct(product);
        console.log(product.$id);
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dispatch = useDispatch();
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [isUpdateNotificationDisplayed, setIsUpdateNotificationDisplayed] =
    useState(false);
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const [previewImg, setPreviewImg] = useState(product.image01);
  const { $id, title, price, category, desc, image01, image02 } = product;
  const relatedProduct = products.filter(
    (item) => item.category === product.category,
  );
  console.log(relatedProduct);

  useEffect(() => {
    const existingPizza = cartProducts.find((item) => item.id === id);
    if (existingPizza) {
      setExtraIngredients(existingPizza.extraIngredients);
    } else {
      setExtraIngredients([]);
    }
  }, [cartProducts, id]);

  const addItem = () => {
    if (account.get) {
      setIsUpdateNotificationDisplayed(true);
      setTimeout(function () {
        alert("Cart Updated");
        setIsUpdateNotificationDisplayed(false);
      }, 3000);

      dispatch(
        cartActions.addItem({
          $id,
          id,
          title,
          price,
          image01,
          extraIngredients,
        }),
      );
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    window.scrollTo(0, 0);
  }, [product]);

  function updateExtraIngredients(ingredient) {
    if (extraIngredients != null && extraIngredients.includes(ingredient)) {
      setExtraIngredients(
        extraIngredients.filter((item) => item !== ingredient),
      );
    } else {
      setExtraIngredients((previousState) => [...previousState, ingredient]);
    }
  }

  const [activeTab, setActiveTab] = useState("description");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Helmet title="Product-details">
      {isUpdateNotificationDisplayed && (
        <div className="updateCartNotifiation">
          <span>You successfully updated your cart!</span>
        </div>
      )}

      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image01)}
                >
                  <img
                    src={product.image01}
                    alt=""
                    className="w-50 image-div"
                  />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image02)}
                >
                  <img
                    src={product.image02}
                    alt=""
                    className="w-50 image-div"
                  />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img
                    src={product.image03}
                    alt=""
                    className="w-50 image-div"
                  />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100 image-div" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>${price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                  {console.log(category)}
                </p>

                <button onClick={addItem} className="add-to-cart">
                  {cartProducts.find((item) => item.id === id)
                    ? "Update Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </Col>
            <div className="tabs">
              <ul className="tab-list">
                <li
                  className={activeTab === "description" ? "active" : ""}
                  onClick={() => handleTabChange("description")}
                >
                  <h6 className="description">Description</h6>
                </li>
                <li
                  className={activeTab === "extra-ingredients" ? "active" : ""}
                  onClick={() => handleTabChange("extra-ingredients")}
                >
                  <h6 className="description">Extra Ingredients</h6>
                </li>
              </ul>

              {activeTab === "description" && (
                <div className="tab-content">
                  <Col lg="12">
                    <div className="description__content">
                      <p>{desc}</p>
                    </div>
                  </Col>
                </div>
              )}

              {activeTab === "extra-ingredients" && (
                <div className="tab-content">
                  <Col lg="12">
                    <div className="extraIngredientsGrid">
                      {Object.values(ExtraIngredients).map((ingredient) => {
                        return (
                          extraIngredients !== undefined && (
                            <ExtraIngredient
                              isChecked={extraIngredients.includes(ingredient)}
                              key={ingredient}
                              onSelect={(ingredient) =>
                                updateExtraIngredients(ingredient)
                              }
                              ingredient={ingredient}
                            ></ExtraIngredient>
                          )
                        );
                      })}
                    </div>
                  </Col>
                </div>
              )}
            </div>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PizzaDetails;
