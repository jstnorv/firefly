import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Blog from './pages/Blog';

import ChatbotWidget from './components/ChatbotWidget';
import SitePasswordModal from './components/SitePasswordModal';


const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('site_authenticated') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <SitePasswordModal onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <>
      <header>
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/legal">Legal</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <ChatbotWidget />
    </>
  );
};

export default App;
