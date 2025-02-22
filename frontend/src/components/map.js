import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import buildings from "../data/buildings";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 40.4237, 
  lng: -86.9212,
};
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function MapComponent({ onMarkerClick }) {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16}>
        {buildings.map((building) => (
          <Marker
            key={building.id}
            position={{ lat: building.lat, lng: building.lng }}
            title={building.name}
            onClick={() => onMarkerClick(building)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
