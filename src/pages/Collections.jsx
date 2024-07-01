import React, { useState, useEffect } from "react";

import products from "../assets/fake-data/products.js";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet.js";
import CommonSection from "../components/UI/common-section/CommonSection.jsx";
import { Container, Row, Col } from "reactstrap";
import ExtraIngredient from '../components/ExtraIngredient/ExtraIngredient.jsx'
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice.js";
import { useSelector } from "react-redux";

import "../styles/product-details.css";
import "../styles/product-card.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import { Client, ID, promise } from "../lib/appwrite.js";

const ExtraIngredients = {
	MUSHROOMS: "Mushrooms",
	ONION: "Onion",
	PEPPER: "Pepper",
	PINAPPLE: "Pinapple", 
  TUNA: "Tuna", 
  MEAT: "Meat", 
  CHEESE: "Cheese", 
  HOTSAUCE: "Hot Sauce", 
  CORN: "Corn"
}

const Collections = () => {
  const { category } = useParams();
  console.log(category);
  const [products, setProducts] = useState([]); 
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    promise.then((response) => {
      const products = response.documents;
      setProducts(products);
      products.forEach((item)=>console.log(item.category)
      );
      setRelatedProduct(products.filter((item) => item.category.includes(category)));
    }).catch((error) => {
      //console.error(error);
    });
  }, []);

  
  console.log(relatedProduct);
  

    

  

return (
  <section>
        <Container>
          <Row>
  {relatedProduct.map((item) => (
    <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
      <ProductCard item={item} />
    </Col>
  ))}</Row>
  </Container>
  </section>
);
    
};

export default Collections;
