import { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/sparkles-theme.css';

const Layout = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      <Header />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;