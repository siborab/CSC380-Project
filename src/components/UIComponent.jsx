import React from "react";
import "./UIComponent.css";

const UIComponent = ({
  inputValue,
  setInputValue,
  keyValue,
  setKeyValue,
  outputData,
  isLoading,
  error,
  onEncrypt,
  onDecrypt,
  onBruteForce,
  onAnalyze, 
}) => {

  return (
    <div className="ui-container">
      <header className="app-header">
        <h1>Caesar Cipher Simulator</h1>
        <p className="subtitle">CSC 380 Group Project</p>
      </header>

      <main className="main-content">
        {/* Input Section */}
        <section className="input-section">
          <h2>Input</h2>

          <form className="input-form">
            {/* Message Input */}
            <div className="input-group">
              <label htmlFor="message">Enter Message:</label>
              <textarea
                id="message"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                rows={6}
              />
            </div>

            {/* Key Input */}
            <div className="input-group">
              <label htmlFor="key">Key (Shift Value):</label>
              <input
                type="number"
                id="key"
                className="input-field"
                value={keyValue}
                onChange={(e) =>
                  setKeyValue(e.target.value === "" ? 0 : parseInt(e.target.value))
                }
                placeholder="Enter key (e.g. 3)"
              />
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button
                type="button"
                className="submit-btn"
                onClick={onEncrypt}
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? "Processing..." : "Encrypt"}
              </button>

              <button
                type="button"
                className="clear-btn"
                onClick={onDecrypt}
                disabled={isLoading || !inputValue.trim()}
              >
                Decrypt
              </button>

              <button
                type="button"
                className="attack-btn"
                onClick={onBruteForce}
                disabled={isLoading || !inputValue.trim()}
              >
                Brute Force Attack
              </button>

              
              <button
                type="button"
                className="attack-btn"
                onClick={onAnalyze}
                disabled={isLoading || !inputValue.trim()}
              >
                Frequency Analysis
              </button>
            </div>
          </form>
        </section>

        {/* Output Section */}
        <section className="output-section">
          <h2>Output</h2>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Processing your request...</p>
            </div>
          )}

          {outputData && !isLoading && (
            <div className="output-container">
              <div className="output-content">
                <pre className="output-text">{outputData}</pre>
              </div>

              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(outputData)}
              >
                📋 Copy Output
              </button>
            </div>
          )}

          {!outputData && !isLoading && !error && (
            <div className="empty-output">
              <p>
                No output yet. Enter a message and key, then click Encrypt,
                Decrypt, Brute Force Attack, or Frequency Analysis.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default UIComponent;
