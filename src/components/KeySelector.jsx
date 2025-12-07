import React from "react";

const KeySelector = ({ keyValue, setKeyValue }) => {
  return (
    <div>
      <label htmlFor="key">Select Key:</label>
      <input
        type="number"
        id="key"
        value={keyValue}
        onChange={(e) => setKeyValue(e.target.value === "" ? "" : parseInt(e.target.value))}
        onKeyDown={(e) => {
          // allow control keys
          if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) return;
          // allows numbers
          if (e.key >= '0' && e.key <= '9') return;
          // allow minus sign
          if (e.key === '-') return;
          // block everything else
          e.preventDefault();
        }}
        placeholder="Enter key"
      />
    </div>
  );
};
export default KeySelector;
