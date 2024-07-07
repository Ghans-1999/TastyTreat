import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useParams, Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MdLocationOn } from "react-icons/md";
import { useState, useEffect } from "react";
import { Client, ID, promise, orders } from "../lib/appwrite.js";

function Track() {
  const { id } = useParams();
  const [parcelLocation, setParcelLocation] = useState({
    latitude: 19.7253,
    longitude: 72.106087,
  });
  const [mylatitude, setMyLatitude] = useState(19.0767253); //19.0767253, 72.9106087
  const [mylongitude, setMyLongitude] = useState(72.9106087);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLatitude(position.coords.latitude);
        setMyLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      },
    );
  }, []);

  useEffect(() => {
    orders
      .then((response) => {
        const orders = response.documents;
        const order = orders.find((order) => order.$id === id);
        if (order) {
          setParcelLocation({
            latitude: order.parcellattitude,
            longitude: order.parcellongitude,
          });
        }
        console.log(response.documents);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const CustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    iconSize: [38, 38],
  });
  const markers = [
    {
      geocode: [mylatitude, mylatitude],
      popUp: "Food",
    },
  ];

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={[mylatitude, mylongitude]}
      zoom={18}
      style={{ height: "80%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[mylatitude, mylongitude]} icon={CustomIcon}></Marker>
      <Marker
        position={[parcelLocation.latitude, parcelLocation.longitude]}
        icon={CustomIcon}
      ></Marker>
    </MapContainer>
  );
}

export default Track;
