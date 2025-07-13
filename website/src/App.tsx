import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Blog from './pages/Blog';

import ChatbotWidget from './components/ChatbotWidget';


const App: React.FC = () => {


  return (
    <>
      <header>
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0, justifyContent: 'center' }}>
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
      <main style={{
        minHeight: '70vh',
        paddingTop: '5vh',
        paddingBottom: '2rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 600,
          width: '100%',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </main>
      <ChatbotWidget />
    </>
  );
};

export default App;
