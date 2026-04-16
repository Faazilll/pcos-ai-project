import React from 'react';

const Header = ({ setActiveTab, theme = 'dark', onToggleTheme, onOpenLogin, onOpenSignup }) => {
  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'early-detection', label: 'Early Detection' },
    { key: 'tracker', label: 'Period Tracker' },
    { key: 'resources', label: 'Resources' },
    { key: 'community', label: 'Community' },
  ];

  return (
    <header className="bg-dark backdrop-blur-md sticky top-0 z-50 border-b border-slate-700 header-divider">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center medical-border">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-teal-400">
              <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 10c1.2-1.5 4-1.2 4 1.2 0 2.1-3.1 3.9-4 4.3-.9-.4-4-2.2-4-4.3 0-2.4 2.8-2.7 4-1.2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Aura<span className="text-teal-400">Health</span></h1>
            <p className="text-xs text-slate-400">Advanced AI for Women's Wellness</p>
          </div>
        </div>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className="text-slate-300 font-medium hover:text-teal-400 transition-colors duration-300 cursor-pointer text-sm uppercase tracking-wider"
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-700 hover:border-teal-500 transition-colors"
          >
            {theme === 'light' ? (
              <span aria-hidden="true" className="text-xl">🌞</span>
            ) : (
              <span aria-hidden="true" className="text-xl">🌙</span>
            )}
          </button>

          {/* Auth */}
          <button onClick={onOpenLogin} className="text-slate-300 hover:text-white font-semibold px-4 hidden sm:block">Log in</button>
          <button onClick={onOpenSignup} className="aura-button">Sign up</button>

          <button 
            onClick={() => setActiveTab('onboarding')}
            className="aura-button-outline hidden md:flex"
          >
            My Profile
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;