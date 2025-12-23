import { useState, useEffect } from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main className="container mx-auto px-4 pb-20">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>Wishing you joy and happiness this holiday season</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;