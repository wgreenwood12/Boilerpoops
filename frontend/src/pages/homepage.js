// pages/homepage.js
import React, { useState, useEffect } from "react";
import MapComponent from "../components/map";
import BuildingInfo from "../components/buildinginfo";
import { fetchMessage, sendBuildingClick } from "../services/api";
import "../styles/global.css";

function HomePage() {
  const [message, setMessage] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const backendMessage = await fetchMessage();
      setMessage(backendMessage);
    };
    getMessage();
  }, []);

  const handleMarkerClick = async (building) => {
    setSelectedBuilding(building); // Sets the selected building
    await sendBuildingClick(building.id); // Sends the click info to your backend
  };

  return (
    <div className="container">
      <h1>BoilerPoops</h1>
      <p className="subtitle">Find and rate Purdue's best bathrooms</p>

      <div className="main-content">
        {/* Left panel with map */}
        <div className="map-panel">
          <MapComponent onMarkerClick={handleMarkerClick} />
        </div>

        {/* Right panel with building information and reviews */}
        <div className="info-panel">
          <BuildingInfo building={selectedBuilding} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
