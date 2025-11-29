import React from "react";

const MessageInput = ({ message, setMessage }) => {
  return (
    <div>
      <label htmlFor="message">Enter Message:</label>
      <input
        type="text"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
    </div>
  );
};

export default MessageInput;
