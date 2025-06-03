import React, { useState } from 'react';
import './InputPage.css';

/**
 * InputPage component collects user inputs for AI dialogue
 */
function InputPage({ onStartConversation }) {
  const [numExchanges, setNumExchanges] = useState(5);
  const [starterAI, setStarterAI] = useState('ChatGPT');
  const [topic, setTopic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartConversation({ numExchanges, starterAI, topic });
  };

  return (
    <div className="inputPageWrapper">
      <form className="inputForm" onSubmit={handleSubmit}>
        <h2 className="formTitle">Start AILogue</h2>

        <label>Number of Exchanges:</label>
        <input
          type="number"
          value={numExchanges}
          onChange={(e) => setNumExchanges(Number(e.target.value))}
          min="1"
          required
        />

        <label>Select Starter AI:</label>
        <select value={starterAI} onChange={(e) => setStarterAI(e.target.value)}>
          <option value="ChatGPT">ChatGPT</option>
          <option value="Gemini">Gemini</option>
        </select>

        <label>Topic or Initial Prompt:</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="E.g., Discuss the future of AI in education"
          required
        />

        <button type="submit">Start Conversation</button>
      </form>
    </div>
  );
}

export default InputPage;
