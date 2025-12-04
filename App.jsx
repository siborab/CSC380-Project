// App.js - Example integration for Anas
import React, { useState } from 'react';
import UIComponent from './components/UIComponent';
import './App.css';

function App() {
  // State management (Anas will handle this part)
  const [inputValue, setInputValue] = useState('');
  const [outputData, setOutputData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handler for form submission (Anas will implement the backend logic)
  const handleSubmit = async (input) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Anas will add the actual backend API call here
      // Example:
      const response = await fetch('/api/caesar-cipher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, shift: 3 })
      });
      // const data = await response.json();
      
      // Simulated API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulated response
      const mockResponse = {
        processed: true,
        result: `Processed: ${input}`,
        timestamp: new Date().toISOString()
      };
      
      setOutputData(mockResponse);
    } catch (err) {
      setError('Failed to process input. Please try again.');
      console.error('Processing error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <UIComponent
        onSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        outputData={outputData}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;
