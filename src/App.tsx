import React, { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import './App.css';

const PASSWORD = '***REMOVED***'; // Change this password before deploying
interface Message {
  sender: 'user' | 'bot';
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg: Message = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');

    // Placeholder bot logic. Replace this with an API call to your backend later.
    setTimeout(() => {
      const botMsg: Message = {
        sender: 'bot',
        text: `You said: "${userMsg.text}" (replace this with real backend response)`
      };
      setMessages((msgs) => [...msgs, botMsg]);
    }, 500);
  };

  // Scroll to bottom on new message
  // (Optional: can be improved for production)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll on new message (only when authed)
  React.useEffect(() => {
    if (authed) scrollToBottom();
  }, [messages, authed]);

  if (!authed) {
    return (
      <div className="chatbot-container">
        <h1>Firefly Chatbot</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (pwInput === PASSWORD) {
              setAuthed(true);
              setPwError('');
            } else {
              setPwError('Incorrect password.');
            }
          }}
          style={{ marginTop: '2rem' }}
        >
          <input
            type="password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            placeholder="Enter password to access chatbot"
            style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ marginLeft: 8, padding: '0.5rem 1rem' }}>Enter</button>
        </form>
        {pwError && <div style={{ color: 'red', marginTop: 8 }}>{pwError}</div>}
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <h1>Firefly Chatbot</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <b>{msg.sender === 'user' ? 'You' : 'Bot'}:</b> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      <p className="read-the-docs">
        {/* To connect to a backend, replace the placeholder logic in handleSend with an API call. */}
      </p>
    </div>
  );
}

export default App;
