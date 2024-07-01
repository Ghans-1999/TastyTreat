//import { Map, Marker } from 'leaflet';
import { MapContainer, TileLayer,Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MdLocationOn } from "react-icons/md";
import { useState, useEffect } from "react";


function MapComponent( ) {

  const [latitude, setLatitude] = useState(19.0611456);
  const [longitude, setLongitude] = useState(72.8498176);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }, error => {
      console.error(`Error getting location: ${error.message}`);
    });
  }, []);

  const CustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    iconSize: [38,38]
  })
  const markers = [
    {
      geocode: [latitude, longitude],
      popUp: "Food"
    }
  ]

  return ( 
    // Make sure you set the height and width of the map container otherwise the map won't show
      <MapContainer center={[latitude, longitude]} zoom={18} style={{ height: 400, width: "100%" }}>
        <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
        { 
        markers.map((marker)=>(
          <Marker position={marker.geocode} icon={CustomIcon} popUp={marker.popUp}></Marker>
        ))


        }
      </MapContainer>
  );
}

export default MapComponent;