// components/map.js
import React from "react";
import { GoogleMap, LoadScript, Polygon, OverlayView } from "@react-google-maps/api";
import buildings from "../data/buildings";

const containerStyle = {
  width: "50vw",
  height: "75.3vh",
};

const center = {
  lat: 40.428,
  lng: -86.92,
};

const mapOptions = {
  styles: [
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { color: "#e0e0e0" },
        { weight: 0.5 },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        { weight: 0.3 },
        { color: "#bdbdbd" },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        { color: "#D3D3D3" },
        { visibility: "simplified" },
        { weight: 0.5 },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#BFBFBF" },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

const highlightedBuildingIds = [1, 2, 3, 4]; 

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function MapComponent({ onMarkerClick }) {
  const getBuildingPolygon = (building) => [
    { lat: building.lat + 0.00025, lng: building.lng - 0.0003 },
    { lat: building.lat + 0.00025, lng: building.lng + 0.0003 },
    { lat: building.lat - 0.00025, lng: building.lng + 0.0003 },
    { lat: building.lat - 0.00025, lng: building.lng - 0.0003 },
  ];

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16} options={mapOptions}>
        {buildings.map((building) => {
          const isHighlighted = highlightedBuildingIds.includes(building.id);

          return (
            <React.Fragment key={building.id}>
              {isHighlighted && (
                <Polygon
                  paths={getBuildingPolygon(building)}
                  options={{
                    fillColor: "#FFD700",
                    fillOpacity: 0.4,
                    strokeColor: "#000000",
                    strokeWeight: 3,
                  }}
                />
              )}

              <OverlayView
                position={{ lat: building.lat, lng: building.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({
                  x: -70,
                  y: -50,
                })}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#333",
                    textAlign: "center",
                    minWidth: "120px",
                    maxWidth: "120px",
                  }}
                  onClick={() => onMarkerClick(building)} // Calls onMarkerClick to update selectedBuilding
                >
                  {building.name}
                </div>
              </OverlayView>
            </React.Fragment>
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
