import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {

        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>BoilerDumps</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
