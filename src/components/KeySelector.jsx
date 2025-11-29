import React from "react";

const KeySelector = ({ keyValue, setKeyValue }) => {
  return (
    <div>
      <label htmlFor="key">Select Key:</label>
      <input
        type="number"
        id="key"
        value={keyValue}
        onChange={(e) => setKeyValue(Number(e.target.value))}
        min="0"
        max="25"
        placeholder="Enter key number"
      />
    </div>
  );
};
export default KeySelector;
