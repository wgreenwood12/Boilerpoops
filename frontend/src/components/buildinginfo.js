import React from "react";

function BuildingInfo({ building }) {
  if (!building) {
    return <div>Select a building to see details.</div>;
  }

  return (
    <div className="building-info">
      <h2>{building.name}</h2>
  
      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Reviews</h3>
        <p>Here is where we will add our review page.</p>
      </div>

      {/* Leave a Review Section */}
      <div className="leave-review">
        <h3>Leave a Review</h3>
        <p>Here is where we will add a form for users to leave reviews.</p>
      </div>
      <p><strong>Location:</strong> {building.lat}, {building.lng}</p>

    </div>
  );
}

export default BuildingInfo;
