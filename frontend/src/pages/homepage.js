import React, { useState, useEffect } from "react";
import MapComponent from "../components/map";
import BuildingInfo from "../components/buildinginfo";
import { fetchMessage, sendBuildingClick } from "../services/api";

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
    setSelectedBuilding(building);
    await sendBuildingClick(building.id);
  };

  return (
    <div>
      <h1>BoilerDumps</h1>
      <p>Backend says: {message}</p>

      <MapComponent onMarkerClick={handleMarkerClick} />

      <BuildingInfo building={selectedBuilding} />
    </div>
  );
}

export default HomePage;
