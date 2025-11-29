import React from "react";
const ActionButtons = ({handleEncrypt,handleDecrypt }) => {
  return (
    <div style={{ marginTop:"10px"}}>
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}style={{ marginLeft: "10px" }}> Decrypt
      </button>
    </div>
  );
};

export default ActionButtons;
