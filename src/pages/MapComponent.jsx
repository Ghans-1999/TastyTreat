import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MdLocationOn } from "react-icons/md";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function MapComponent({ onLatLngChange }) {
  const [latitude, setLatitude] = useState(19.0767253); //19.0767253, 72.9106087
  const [longitude, setLongitude] = useState(72.9106087);
  const [locname, setLocname] = useState("Location");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      },
    );
  }, []);

  const center = {
    lat: 19.0767253,
    lng: 72.9106087,
  };

  function DraggableMarker() {
    const CustomIcon = new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
      iconSize: [38, 38],
    });
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const latLng = marker.getLatLng();
            const geocoder = L.Control.Geocoder.nominatim();

            geocoder.reverse(latLng, 39554432, (results) => {
              if (results.length > 0) {
                const address = results[0].name;
                console.log(address);
                setLocname(address);
                // Update your component's state or perform any other action with the address
              } else {
                console.log("No address found");
              }
            });
            onLatLngChange(latLng);
            setPosition(marker.getLatLng());
          }
        },
      }),
      [],
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={CustomIcon}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable ? locname : "Click here to choose modify a Location"}
          </span>
        </Popup>
      </Marker>
    );
  }

  const markers = [
    {
      geocode: [latitude, longitude],
      popUp: "Food",
    },
    {
      geocode: [latitude + 0.7, longitude + 0.7],
      popUp: "Food",
    },
  ];

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={[latitude, longitude]}
      zoom={18}
      style={{ height: 400 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
  );
}

export default MapComponent;
