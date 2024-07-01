import React from "react";

import "../../../styles/product-card.css";

// import productImg from "../../../assets/images/product_2.1.jpg";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';

import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, title, image, price, extraIngredients, desc,highligth } = props.item;
  const dispatch = useDispatch();
  const image01 = image[0];
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
        extraIngredients
      })
    );
  };

  /*return (
    <div className="product__item d-flex flex-column justify-content-between">
      <div className="product__content">
        <img className="product__img w-50" src={image01} alt="Pizza" />
        <h5>
          <Link to={`/pizzas/${id}`}>{title}</Link>
        </h5>
      </div>
      <div>
        <h5>{desc.split(' ').slice(0, 10).join(' ') + (desc.split(' ').length > 10 ? '...' : '')}</h5>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <span className="product__price mb-2">{price} € </span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );*/

  return (
    <div class="product-card">
  <div class="image-container">
    {image[0] && <img src={image[0]} alt={title}/>}
    {highligth && <span class="hot-deals-tag">{highligth}</span>}
    <span className="rating-tag">&#11088;4.5</span>
    {price && <h3 class="price">{price} &#122;&#322;</h3>}
  </div>
  <div class="details-container">
    
    <h2 class="title"><Link to={`/pizzas/${id}`}>{title}</Link></h2>
    {desc && <h5 class="details">{desc.split(' ').slice(0, 4).join(' ') + (desc.split(' ').length > 4 ? '...' : '')}</h5>}
    
    <button class="add-to-cart" onClick={addToCart}>Add to Cart</button>
  </div>
</div>
  );
}

export default ProductCard;
