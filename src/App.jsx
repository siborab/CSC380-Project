import React, { useState } from "react";
import MessageInput from "./components/MessageInput";
import KeySelector from "./components/KeySelector";
import ActionButtons from "./components/ActionButtons";
import ResultBox from "./components/ResultBox";
import "./app.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [keyValue, setKeyValue] = useState(0);
  const [result, setResult] = useState("");
  // Helper function to connect to backend
  const performCipher = async (endpoint) => {
    if (!message) {
      setResult("Error: Please enter a message.");
      return;
    }

    let finalKey = keyValue;
    if (keyValue === "") {finalKey = 0; setKeyValue(0);}

    setResult("Processing..."); // Temporary status while loading

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message, shift: finalKey}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

      // Backend returns different keys: 'encryptedText' or 'decryptedText'
      if (endpoint === "/api/encrypt") {
        setResult(data.encryptedText);
      } else {
        setResult(data.decryptedText);
      }
    } catch (error) {
      console.error(error);
      setResult("Error: Could not connect to backend. Make sure the server is running on port 3001.");
    }
  };

  // The new handlers that trigger the helper function
  const handleEncrypt = () => performCipher("/api/encrypt");
  const handleDecrypt = () => performCipher("/api/decrypt");

  return (
    <div className="app-container">
      <h1>Caesar Cipher Simulator</h1>
      <MessageInput message={message} setMessage={setMessage} />
      <KeySelector keyValue={keyValue} setKeyValue={setKeyValue} />
      <ActionButtons handleEncrypt={handleEncrypt} handleDecrypt={handleDecrypt} />
      <ResultBox result={result} />
    </div>
  );
};

export default App;
