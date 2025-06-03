import React, { useEffect, useState } from 'react';
import MessageBubble from '../components/MessageBubble';

/**
 * ChatPage sends topic to backend and receives real AI conversation
 */
function ChatPage({ starterAI, topic, numExchanges, onBack }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversation();
  }, []);

  const fetchConversation = async () => {
    try {
      const res = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ starterAI, topic, numExchanges })
      });
      const data = await res.json();
      if (data.conversation) {
        setChatHistory(data.conversation);
      } else {
        setChatHistory([{ sender: 'System', text: data.error || 'Unknown error occurred.' }]);
      }
    } catch (err) {
      setChatHistory([{ sender: 'System', text: 'Network error. Try again later.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={onBack}>Return to Input Page</button>
      {loading ? (
        <p>Loading conversation...</p>
      ) : (
        <div style={{ maxHeight: '80vh', overflowY: 'scroll', marginTop: '1rem' }}>
          {chatHistory.map((msg, index) => (
            <MessageBubble
              key={index}
              messageText={msg.text}
              sender={msg.sender}
              alignRight={msg.sender === starterAI}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatPage;
