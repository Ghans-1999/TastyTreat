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
import { Table } from "reactstrap";
import {
  FaTimesCircle,
  FaCheckCircle,
  FaChevronCircleRight,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import {
  Client,
  ID,
  promise,
  orders,
  databases,
  account,
} from "../lib/appwrite.js";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";

const PreviousOrders = () => {
  const [preOrders, setPreOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    account.getSession("current").then(
      function (response) {
        const preOrder = databases
          .listDocuments("TastyTreat", "667d7d17002d10cb5826", [
            Query.equal("Customer", response.userId),
          ])
          .then((response) => {
            setPreOrders(response.documents);
            console.log(response.documents); // Array of matching documents
          })
          .catch((error) => {
            console.error(error);
          });
      },
      function (error) {
        navigate("/login");
      },
    );
  }, []);

  /*return (
    <>
      <table className="table table-borderless mb-5 align-middle">
        <tbody>
          {preOrders.map((item) => (
            <Tr item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </>
  );*/

  return (
    <>
      <h3 style={{ textAlign: "center" }}> Your's All Orders</h3>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>#</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Total</th>
            <th style={{ textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {preOrders.map((item, index) => (
            <Tr item={item} key={item.id} index={index} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

const Tr = (props) => {
  const { $id, Total, index, DateTime, Status } = props.item;
  const dispatch = useDispatch();
  const isoString = "2024-07-16T12:34:56.789Z";
  const date = new Date(DateTime);
  const formattedDate =
    date.getDate() +
    " " +
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getFullYear();
  const deleteItem = () => {
    dispatch(cartActions.deleteItem($id));
  };
  return (
    <tr key={index}>
      <th scope="row">
        <h1>{index}</h1>
      </th>
      <td style={{ textAlign: "center" }}>
        <h6>{formattedDate}</h6>
      </td>
      <td style={{ textAlign: "center" }}>
        <h6>{Total}</h6>
      </td>
      {Status === "Delivered" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FaCheckCircle size={25} color="green" />
        </div>
      ) : Status === "Cancelled" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FaTimesCircle size={25} color="red" />
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ textAlign: "center" }}>
            <h6 style={{ textAlign: "center" }}>{Status}</h6>
          </span>
          <Link to={`/track/${$id}`}>
            <FaChevronCircleRight size={25} color="green" />
          </Link>
        </div>
      )}
    </tr>
  );
};

export default PreviousOrders;
