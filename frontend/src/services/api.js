import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;;

// Fetch backend message
export const fetchMessage = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "";
  }
};

// Send building click data to backend
export const sendBuildingClick = async (buildingId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/building-click`, { building_id: buildingId });
    return response.data;
  } catch (error) {
    console.error("Error sending request:", error);
    return null;
  }
};
