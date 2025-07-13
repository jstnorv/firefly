import React, { useState } from 'react';

const SITE_PASSWORD = 'changeme'; // Replace with your desired password

const SitePasswordModal: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === SITE_PASSWORD) {
      localStorage.setItem('site_authenticated', 'true');
      onAuthenticated();
    } else {
      setError('Incorrect password.');
      setInput('');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: 32,
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 320,
        alignItems: 'center',
      }}>
        <h2 style={{ marginBottom: 16 }}>Enter Site Password</h2>
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', marginBottom: 16, width: '100%' }}
          autoFocus
        />
        <button type="submit" style={{ padding: '10px 24px', borderRadius: 6, background: '#646cff', color: '#fff', border: 'none', fontWeight: 500, marginBottom: 8 }}>
          Continue
        </button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
};

export default SitePasswordModal;
