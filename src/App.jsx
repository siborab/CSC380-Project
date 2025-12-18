import React, { useState } from "react";
import UIComponent from "./components/UIComponent";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [keyValue, setKeyValue] = useState(0);
  const [outputData, setOutputData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const performCipher = async (endpoint) => {
    if (!inputValue.trim()) {
      setError("Please enter a message.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const body =
        endpoint === "/api/bruteforce"
          ? { text: inputValue }
          : { text: inputValue, shift: keyValue || 0 };

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server error");
      }

      if (endpoint === "/api/encrypt") {
        setOutputData(data.encryptedText);
      } else if (endpoint === "/api/decrypt") {
        setOutputData(data.decryptedText);
      } else if (endpoint === "/api/bruteforce") {
        const formatted = data.possibleDecryptions
          .map((item) => `Shift ${item.shift}: ${item.decrypted}`)
          .join("\n");
        setOutputData(formatted);
      }
    } catch (err) {
      console.error(err);
      setError(
        "Could not connect to backend. Make sure the server is running on port 3001."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <UIComponent
        inputValue={inputValue}
        setInputValue={setInputValue}
        keyValue={keyValue}
        setKeyValue={setKeyValue}
        outputData={outputData}
        isLoading={isLoading}
        error={error}
        onEncrypt={() => performCipher("/api/encrypt")}
        onDecrypt={() => performCipher("/api/decrypt")}
        onBruteForce={() => performCipher("/api/bruteforce")}
      />
    </div>
  );
}

export default App;
