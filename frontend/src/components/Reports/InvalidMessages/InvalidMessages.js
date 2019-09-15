import React from "react";

const InvalidMessages = ({ messages }) => {
  return (
    <div>
      <ul>
        {messages.map(message => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default InvalidMessages;
