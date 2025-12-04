import React from 'react';
import './UIComponent.css';

const UIComponent = ({ onSubmit, inputValue, setInputValue, outputData, isLoading, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
    }
  };

  return (
    <div className="ui-container">
      <header className="app-header">
        <h1>CSC 380 Group Project</h1>
        <p className="subtitle">Input & Output Interface</p>
      </header>

      <main className="main-content">
        {/* Input Section */}
        <section className="input-section">
          <h2>Input</h2>
          <form onSubmit={handleSubmit} className="input-form">
            <div className="input-group">
              <label htmlFor="main-input">Enter your data:</label>
              <textarea
                id="main-input"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type or paste your input here..."
                rows={6}
              />
            </div>
            
            <div className="button-group">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? 'Processing...' : 'Process Input'}
              </button>
              <button 
                type="button" 
                className="clear-btn"
                onClick={() => setInputValue('')}
                disabled={isLoading}
              >
                Clear
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
                {/* Render output based on data type */}
                {typeof outputData === 'string' ? (
                  <pre className="output-text">{outputData}</pre>
                ) : (
                  <div className="output-data">
                    {JSON.stringify(outputData, null, 2)}
                  </div>
                )}
              </div>
              
              <button 
                className="copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(
                    typeof outputData === 'string' 
                      ? outputData 
                      : JSON.stringify(outputData, null, 2)
                  );
                  // You can add a toast notification here
                }}
              >
                📋 Copy Output
              </button>
            </div>
          )}
          
          {!outputData && !isLoading && !error && (
            <div className="empty-output">
              <p>No output yet. Enter some data and click "Process Input" to see results.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default UIComponent;
