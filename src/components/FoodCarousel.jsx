/*import React, { useEffect, useState } from 'react';
import { Client, ID, promise, categories } from "../lib/appwrite.js";
import { Link } from "react-router-dom";
import { 
  CarouselControl, 
  Carousel, 
  CarouselItem, 
  CarouselIndicators, 
} from 'reactstrap'; 


const FoodItem = ({ CategoryImage, Name,Active }) => {
  console.log(CategoryImage);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        margin: '10px',
      }}
    >
      <img
        src={CategoryImage}
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          margin: '10px 0',
          fontStyle : '1rem',
          color: '#212245'
        }}
      >
        <Link to={`/collection/${Name}`}>{Name}</Link>
      </h3>
    </div>
  );
};

const FoodCarousel = () => {
  /*const foodItems = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      title: 'The Burger Fest',
      altText: 'Burger',
    },
    {
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPZynQlFt0D_s9mC-gI516lgXHHl0yyuo5g&s',
      title: 'Pizza',
      altText: 'Pizza',
    },
    {
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPZynQlFt0D_s9mC-gI516lgXHHl0yyuo5g&s',
      title: 'Chinese',
      altText: 'Chinese Food',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      title: 'Biryani',
      altText: 'Biryani',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      title: 'North Indian',
      altText: 'North Indian Food',
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      title: 'Khichdi',
      altText: 'Khichdi',
    },
  ];

  const [category, setCategory] = useState([]);

  useEffect(() => {
    categories.then((response) => {
      setCategory(response.documents);
      console.log(response.documents);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {category.map((item, index) => (
        <FoodItem key={index} {...item} />
      ))}
    </div>
  );
};

export default FoodCarousel;*/

import React, { useState, useEffect } from 'react';
//import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Client, ID, promise, categories } from "../lib/appwrite.js";
import { Link } from 'react-router-dom';
//import '../styles/carousel.css'


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};


function FoodCarousel() {
  const [category, setCategory] = useState([]);
  const [items , setItems] = useState([]);

  useEffect(() => {
    categories.then((response) => {
      setCategory(response.documents);
      setItems(response.documents);
      console.log(response.documents);
    }).catch((error) => {
      console.error(error);
    });
  }, []);



  /*const items = [
    {
      id: 1,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/375px-Pizza-3007395.jpg",
      title: "Pizza"
    },
    {
      id: 2,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/375px-Pizza-3007395.jpg",
      title: "Burger"
    },
    {
      id: 3,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/375px-Pizza-3007395.jpg",
      title: "Momos"
    },
    {
      id: 4,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/375px-Pizza-3007395.jpg",
      title: "Rolls"
    }
  ];*/
  return(<><div style={{ textAlign: "center", width: "80%",margin: "0 auto" }}>
    <h1>What's on your mind?</h1>
    <Carousel responsive={responsive} showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={false} >
      {items.map((item, index) => (
        <div key={item.id}>
          {
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <img src={item.CategoryImage[0]} alt={item.Name} style={{ width: "70%" }} />
                <Link to={`/collection/${item.Name}`}><h5 style={{  width: "50%", margin: "0 auto"  }}>{item.Name}</h5></Link>
              </div>
              {items[index + 1] && (
                <div>
                  <img src={items[index + 1].CategoryImage[0]} alt={items[index + 1].Name} style={{ width: "70%" }} />
                  <Link to={`/collection/${items[index + 1].Name}`} ><h5 style={{  width: "50%",margin: "0 auto"  }}>{items[index + 1].Name}</h5></Link>
                </div>
              )}
              {items[index + 2] && (
                <div>
                  <img src={items[index + 2].CategoryImage[0]} alt={items[index + 2].Name}  style={{ width: "70%" }}/>
                  <Link to={`/collection/${items[index + 2].Name}`} ><h5 style={{  width: "50%",margin: "0 auto"  }}>{items[index + 2].Name}</h5></Link>
                </div>
              )}
            </div>
          }
        </div>
      ))}
    </Carousel>
  </div></>
);
}


export default FoodCarousel;