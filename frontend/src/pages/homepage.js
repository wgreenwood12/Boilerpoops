import React, { useState, useEffect } from "react";
import MapComponent from "../components/map";
import BuildingInfo from "../components/buildinginfo";
import { fetchMessage, sendBuildingClick } from "../services/api";
import buildings from "../data/buildings"; // Import buildings data
import "../styles/global.css";

function HomePage() {
  const [message, setMessage] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  // Sorting buildings based on rating in descending order
  const sortedBuildings = buildings.sort((a, b) => b.rating - a.rating);

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
      {/* Header container with lighter gray background */}
      <div className="header-container">
        <h1>💩Skibidi Ahh Boiler Toilets🚽</h1>
        <p className="subtitle">
        {/* <span className="dark-grey">Find and rate Purdue's best bathrooms.</span>
        <br /> */}
        <span className="dark-grey">Boiler Up and Drop That Dump🔨, then Hammer Down and Leave Your Stamp🔥</span>
      </p>

      </div>

      <div className="main-content">
        {/* Left panel with leaderboard */}
        <div className="leaderboard-panel">
          <h3 className="leaderboard-title">Leaderboard</h3>
          <ul className="leaderboard-list">
            {sortedBuildings.map((building) => (
              <li
                key={building.id}
                onClick={() => handleMarkerClick(building)} // Click to select the building
                className="leaderboard-item"
              >
                <span>{building.name}</span>
                <span className="rating">
                  {building.rating} / 5 ⭐
                </span>
              </li>
            ))}
          </ul>
        </div>

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
