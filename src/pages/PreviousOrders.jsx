import React, { useState, useEffect } from "react";

//import products from "../assets/fake-data/products";
import { useParams, Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ExtraIngredient from "../components/ExtraIngredient/ExtraIngredient.jsx";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector } from "react-redux";

import { MdLocationOn } from "react-icons/md";
import { Client, ID, promise, orders } from "../lib/appwrite.js";

const PreviousOrders = () => {
  const [preOrders, setPreOrders] = useState([]);
  useEffect(() => {
    orders
      .then((response) => {
        setPreOrders(response.documents);
        console.log(response.documents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <table className="table table-borderless mb-5 align-middle">
        <tbody>
          {preOrders.map((item) => (
            <Tr item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};

const Tr = (props) => {
  const { $id, Total } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem($id));
  };
  return (
    <tr>
      <td className="text-center">{$id}</td>
      <td className="text-center">{Total}</td>
      <td className="text-center cart__item-del">
        <i>
          <Link to={`/track/${$id}`}>Track</Link>
        </i>
      </td>
    </tr>
  );
};

export default PreviousOrders;
