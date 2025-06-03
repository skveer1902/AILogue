import React from 'react';
import './MessageBubble.css';

/**
 * Renders a single chat message bubble with AI label
 * @param {Object} props - messageText, sender, alignRight
 */
function MessageBubble({ messageText, sender, alignRight }) {
  return (
    <div className={`messageRow ${alignRight ? 'right' : 'left'}`}>
      <div className="messageBubble">
        <div className="senderLabel">{sender}</div>
        <div className="messageText">{messageText}</div>
      </div>
    </div>
  );
}

export default MessageBubble;
