
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CHATBOT_API_URL = 'https://www.fireflywealthllc.com/chat'; // Production FastAPI endpoint

const ChatbotWidget: React.FC = () => {

  const location = useLocation();
  const isHome = location.pathname === '/';
  const [open, setOpen] = useState(isHome);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Password logic removed

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setLoading(true);
    setError('');
    try {
      const res = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setMessages(msgs => [...msgs, { sender: 'bot', text: data.response }]);
    } catch (err: any) {
      setError('Failed to get response.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  // Password prompt logic removed

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 1000,
      width: open ? 320 : 56,
      height: open ? 400 : 56,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      transition: 'width 0.2s, height 0.2s',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    }}>
      {open ? (
      // ...existing code...
        <>
          <div style={{ background: '#646cff', color: '#fff', padding: '0.75rem', fontWeight: 600 }}>
            Chatbot
            <button onClick={() => setOpen(false)} style={{ float: 'right', background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>&times;</button>
          </div>
          <div style={{ flex: 1, padding: '0.75rem', overflowY: 'auto', fontSize: 14 }}>
            {messages.length === 0 && (
              <div style={{ color: '#888', marginBottom: 8 }}>
                {isHome ? 'Welcome! How can I help you today?' : 'Click the button to chat.'}
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '4px 0' }}>
                <span style={{
                  display: 'inline-block',
                  background: msg.sender === 'user' ? '#e0e7ff' : '#f3f4f6',
                  color: '#222',
                  borderRadius: 8,
                  padding: '6px 12px',
                  maxWidth: '80%',
                }}>{msg.text}</span>
              </div>
            ))}
            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          </div>
          <div style={{ padding: '0.75rem', borderTop: '1px solid #eee', background: '#fafbfc' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' ? handleSend() : undefined}
              placeholder="Type your message..."
              style={{ width: '75%', padding: 6, borderRadius: 6, border: '1px solid #ccc', marginRight: 8 }}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()} style={{ padding: '6px 12px', borderRadius: 6, background: '#646cff', color: '#fff', border: 'none', fontWeight: 500 }}>
              Send
            </button>
          </div>
        </>
      ) : (
        <button
          aria-label="Open chatbot"
          onClick={() => setOpen(true)}
          style={{ width: 56, height: 56, borderRadius: '50%', background: '#646cff', color: '#fff', border: 'none', fontSize: 28, cursor: 'pointer' }}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
