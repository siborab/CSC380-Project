import React from "react";

const ResultBox = ({ result }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <label>Result:</label>
      <textarea
        value={result}
        readOnly
        rows="4"
        cols="50"
        placeholder="Result will appear here"
      />
    </div>
  );
};

export default ResultBox;
