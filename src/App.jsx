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
  const handleEncrypt = () => {
    setResult(`Encrypted message would appear here: "${message}" with key ${keyValue}`);
  };

  const handleDecrypt = () => {
    setResult(`Decrypted message would appear here: "${message}" with key ${keyValue}`);
  };

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
