import "../styles/checkout.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Client, ID, promise,databases } from "../lib/appwrite.js";
import { LocationIcon } from 'reactstrap';
import React, { useState, useEffect } from "react";
//import { Map, TileLayer, Marker } from 'leaflet';
import Map from "../pages/MapComponent"

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [products, setProducts] = useState([]); 
  console.log(cartItems);
  const [showMap, setShowMap] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  let orders = [];

  useEffect(() => {
    promise.then((response) => {
      const products = response.documents;
      setProducts(products);
      setProducts(products);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  async function success() {
    console.log('Success');
    alert('Button has clicked');

    for (const item of cartItems) {
      const { $id: productId } = products.find((product) => product.id === item.id);
      console.log(productId);

      const result = await databases.createDocument(
        'TastyTreat', // databaseId
        '667d6e110017f864661d', // collectionId
        ID.unique(), // documentId
        {
          ProductId: productId,
          Price: item.price,
          Quantity: item.quantity,
        } // data
      );

      console.log(result.$id);
      orders.push(result.$id);
    }

    console.log(orders)
    if(orders.length > 0){

    
    const ordersResult = databases.createDocument(
      'TastyTreat', // databaseId
      '667d7d17002d10cb5826', // collectionId
      ID.unique(), // documentId
      {order: orders} // data
    );

    ordersResult.then((response)=>{
      console.log(response.$id);
      //orders.push(response.$id);
      setShowSuccess(true)
    }).catch((error)=>{
      console.log(error)
    })

  }
    

  }

  let  longitude;
   let latitude;
  async function getLocation(){
    navigator.geolocation.getCurrentPosition(position => {
       latitude = position.coords.latitude;
       longitude = position.coords.longitude;
    
      console.log(`User's location: ${latitude}, ${longitude}`);

      if(latitude != null && longitude != null){
        setShowMap(true)
      }
    }, error => {
      console.error(`Error getting location: ${error.message}`);
    });
  }
 
  

  return (
    <>
    
    <button onClick={getLocation} className="add-to-cart">
    <MdLocationOn/>Get Precise Location
    </button>
    
      {
        showMap && (<Map ></Map>)
      }
      <button onClick={success} className="add-to-cart">
    Checkout
    </button>
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
      </div>)}
    </>
  );
};

export default Checkout;
