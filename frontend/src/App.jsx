import React, { useState } from 'react';
import InputPage from './pages/InputPage';
import ChatPage from './pages/ChatPage';

/**
 * Root component that switches between InputPage and ChatPage
 */
function App() {
  const [conversationSettings, setConversationSettings] = useState(null);

  const handleStartConversation = (settings) => {
    setConversationSettings(settings);
  };

  const handleReturn = () => {
    setConversationSettings(null);
  };

  return (
    <>
      {!conversationSettings ? (
        <InputPage onStartConversation={handleStartConversation} />
      ) : (
        <ChatPage
          starterAI={conversationSettings.starterAI}
          topic={conversationSettings.topic}
          numExchanges={conversationSettings.numExchanges}
          onBack={handleReturn}
        />
      )}
    </>
  );
}

export default App;
