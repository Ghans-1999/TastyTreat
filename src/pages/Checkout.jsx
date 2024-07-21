import "../styles/checkout.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Client, ID, promise, databases, account } from "../lib/appwrite.js";
import { LocationIcon } from "reactstrap";
import React, { useState, useEffect } from "react";
//import { Map, TileLayer, Marker } from 'leaflet';
import Map from "../pages/MapComponent";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [products, setProducts] = useState([]);
  const [userid, setUserId] = useState("");
  console.log(cartItems);
  const [showMap, setShowMap] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  let orders = [];

  useEffect(() => {
    promise
      .then((response) => {
        const products = response.documents;
        setProducts(products);
        setProducts(products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function success() {
    account.getSession("current").then(
      async function (response) {
        setLoading(true);
        setShowMap(false);
        console.log(response);

        if (response.expire) {
          console.log("Success");
          setUserId(response.userId);
          for (const item of cartItems) {
            const { $id: productId } = products.find(
              (product) => product.id === item.id,
            );
            console.log(productId);

            const result = await databases.createDocument(
              "TastyTreat", // databaseId
              "667d6e110017f864661d", // collectionId
              ID.unique(), // documentId
              {
                ProductId: productId,
                Price: item.price,
                Quantity: item.quantity,
              }, // data
            );

            console.log(result.$id);
            orders.push(result.$id);
          }

          console.log(response.userId);
          if (orders.length > 0) {
            const date = new Date();
            const isoString = date.toISOString();
            console.log(isoString);
            const ordersResult = databases.createDocument(
              "TastyTreat", // databaseId
              "667d7d17002d10cb5826", // collectionId
              ID.unique(), // documentId
              {
                order: orders,
                Customer: response.userId,
                DateTime: date.toISOString(),
                fcmToken:
                  localStorage.getItem("fcmToken") !== null
                    ? localStorage.getItem("fcmToken")
                    : "",
              }, // data
            );

            ordersResult
              .then((response) => {
                console.log(response.$id);
                //orders.push(response.$id);
                setLoading(false);
                setShowSuccess(true);
              })
              .catch((error) => {
                setLoading(false);
                console.log(error);
              });
          }
        } else {
          setLoading(false);
          navigate("/login");
        }
      },
      function (error) {
        setLoading(false);
        navigate("/login");
      },
    );
  }

  const handleLatLngChange = (latLng, addressName) => {
    console.log(`Received latLng: ${latLng}`);
    console.log(addressName);
    // Do something with the latLng value
  };

  let longitude;
  let latitude;
  async function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        console.log(`User's location: ${latitude}, ${longitude}`);

        if (latitude != null && longitude != null) {
          setShowMap(true);
        }
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      },
    );
  }

  return (
    <>
      <div className="mt-4">
        <button onClick={getLocation} className="add-to-cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="currentColor"
          >
            <path d="M11 5.07089C7.93431 5.5094 5.5094 7.93431 5.07089 11H7V13H5.07089C5.5094 16.0657 7.93431 18.4906 11 18.9291V17H13V18.9291C16.0657 18.4906 18.4906 16.0657 18.9291 13H17V11H18.9291C18.4906 7.93431 16.0657 5.5094 13 5.07089V7H11V5.07089ZM3.05493 11C3.51608 6.82838 6.82838 3.51608 11 3.05493V1H13V3.05493C17.1716 3.51608 20.4839 6.82838 20.9451 11H23V13H20.9451C20.4839 17.1716 17.1716 20.4839 13 20.9451V23H11V20.9451C6.82838 20.4839 3.51608 17.1716 3.05493 13H1V11H3.05493ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"></path>
          </svg>
          Get Precise Location
        </button>

        {showMap && <Map onLatLngChange={handleLatLngChange}></Map>}
        <button onClick={success} className="add-to-cart">
          Checkout
        </button>
      </div>
      {loading && (
        <div className="spinner-container">
          <Spinner color="danger" type="grow" size="lg" />
          <span>Loading...</span>
        </div>
      )}
      {showSuccess && (
        <div className="checkoutMessage">
          <div className="checkoutTitleContainer">
            <AiFillCheckCircle className="checkoutIcon" />
            <h3>Thank you for your order!</h3>
          </div>
          <span>
            Your order is being processed and will be delivered as fast as
            possible.
          </span>
        </div>
      )}
    </>
  );
};

export default Checkout;
