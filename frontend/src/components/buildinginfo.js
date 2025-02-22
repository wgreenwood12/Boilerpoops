import React from "react";

function BuildingInfo({ building }) {
  if (!building) return null;

  return (
    <div>
      <h2>Selected Building: {building.name}</h2>
    </div>
  );
}

export default BuildingInfo;
