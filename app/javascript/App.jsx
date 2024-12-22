import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WordExplorerPage from './pages/WordExplorerPage';
import Logo from './components/Logo';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${isActive
          ? 'bg-blue-700 text-white'
          : 'text-gray-300 hover:bg-blue-700/50 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Logo />
                  <span className="text-white text-lg font-bold">
                    Trump Tweet Analysis
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/word-explorer">Word Explorer</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/word-explorer" element={<WordExplorerPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;