import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { FaUser, FaPhone } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MdLocationOn } from "react-icons/md";
import { useState, useEffect } from "react";
import { Client, ID, promise, orders, databases } from "../lib/appwrite.js";

function Track() {
  const { id } = useParams();
  const [parcelLocation, setParcelLocation] = useState({
    latitude: 19.7253,
    longitude: 72.106087,
  });
  const [parcellatitude, setParcelLatitude] = useState(20.0767253); //19.0767253, 72.9106087
  const [parcellongitude, setParcelLongitude] = useState(72.9106087);
  const [mylatitude, setMyLatitude] = useState(19.0767253); //19.0767253, 72.9106087
  const [mylongitude, setMyLongitude] = useState(72.9106087);
  const [mapCenter, setMapCenter] = useState([mylatitude, mylongitude]);
  const [mapZoom, setMapZoom] = useState(18);
  const [deliveryName, setDeliveryName] = useState("");

  const CustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png", //https://cdn-icons-png.flaticon.com/128/15746/15746151.png  https://cdn-icons-png.flaticon.com/128/684/684908.png
    iconSize: [38, 38],
  });

  const DeliveryIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png", //https://cdn-icons-png.flaticon.com/128/15746/15746151.png  https://cdn-icons-png.flaticon.com/128/684/684908.png
    iconSize: [38, 38],
  });

  const [intTime, setIntTime] = useState(0);
  const [DeliverymanName, setDeliverymanName] = useState("");
  const [DeliverymanContact, setDeliverymanContact] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLatitude(parseFloat(position.coords.latitude));
        setMyLongitude(parseFloat(position.coords.longitude));
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
        console.log(order);
        if (order) {
          setParcelLatitude(parseFloat(order.parcellattitude));
          setParcelLongitude(parseFloat(order.parcellongitude));
          setDeliverymanName(order.DeliverymanName);
          setDeliverymanContact(order.DeliverymanContact);
        }
        console.log(parcellatitude);
        console.log(parcellongitude);
      })
      .catch((error) => {
        console.error(error);
      });
    setInterval(() => {
      const ordersLive = databases.listDocuments(
        "TastyTreat",
        "667d7d17002d10cb5826",
      );
      ordersLive
        .then((response) => {
          const orders = response.documents;
          const order = orders.find((order) => order.$id === id);
          console.log(order);
          if (order) {
            setParcelLatitude(parseFloat(order.parcellattitude));
            setParcelLongitude(parseFloat(order.parcellongitude));
            setIntTime(intTime + 1);
          }
          console.log(parcellatitude);
          console.log(parcellongitude);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 30000);
  }, []);

  const markers = [
    {
      geocode: [mylatitude, mylongitude],
      popUp: "You",
    },
    {
      geocode: [parcellatitude, parcellongitude],
      popUp: (
        <Card>
          <CardBody>
            <CardTitle>
              <FaUser /> {DeliverymanName}
            </CardTitle>
            <CardText>
              <FaPhone /> {DeliverymanContact}
            </CardText>
          </CardBody>
        </Card>
      ),
    },
  ];

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      style={{ height: "80vh" }}
      key={intTime}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*<Marker position={[mylatitude, mylongitude]} icon={CustomIcon}></Marker>
      <Marker
        position={[parcellatitude, parcellongitude]}
        icon={CustomIcon}
      ></Marker-->*/}
      {markers.map((marker, index) => (
        <Marker position={marker.geocode} icon={CustomIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Track;
