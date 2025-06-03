import React, { useEffect, useState, useRef } from 'react';
import MessageBubble from '../components/MessageBubble';

function ChatPage({ starterAI, topic, numExchanges, onBack }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [fullConversation, setFullConversation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, typing]);

  const fetchConversation = async () => {
    try {
      const res = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ starterAI, topic, numExchanges })
      });

      const data = await res.json();
      if (data.conversation) {
        setFullConversation(data.conversation);
        setLoading(false);
        revealMessagesSequentially(data.conversation);
      } else {
        showError(data.error || 'Unexpected error from backend.');
        setLoading(false);
      }
    } catch (err) {
      showError('Network error. Could not reach backend.');
      setLoading(false);
    }
  };

  const revealMessagesSequentially = async (messages) => {
    for (let i = 0; i < messages.length; i++) {
      setTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setChatHistory(prev => [...prev, messages[i]]);
      setTyping(false);
    }
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 5000); // Hide after 5s
  };

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={onBack}>Return to Input Page</button>

      {loading ? (
        <div className="spinner" />
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

          {typing && (
            <MessageBubble
              messageText="Typing..."
              sender="System"
              alignRight={false}
            />
          )}
          <div ref={chatEndRef} />
        </div>
      )}

      {errorMessage && (
        <div className="snackbar">{errorMessage}</div>
      )}
    </div>
  );
}

export default ChatPage;
