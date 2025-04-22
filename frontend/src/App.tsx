import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LuggageForm from './components/LuggageForm';
import LuggageSearch from './components/LuggageSearch';
import Login from './components/Login';
import Register from './components/Register';
import LanguageSelector from './components/LanguageSelector';
import { useTypedTranslation } from './utils/translation';

function App() {
  const { t } = useTypedTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Add any additional logout logic here
  };

  useEffect(() => {
    const getPageTitle = (pathname: string) => {
      switch (pathname) {
        case '/':
          return t('common.appName');
        case '/login':
          return `${t('auth.login')} - ${t('common.appName')}`;
        case '/register':
          return `${t('auth.register')} - ${t('common.appName')}`;
        case '/profile':
          return `${t('nav.profile')} - ${t('common.appName')}`;
        case '/report':
          return `${t('navigation.report')} - ${t('common.appName')}`;
        case '/search':
          return `${t('navigation.search')} - ${t('common.appName')}`;
        default:
          return t('common.appName');
      }
    };

    document.title = getPageTitle(location.pathname);
  }, [location.pathname, t]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <svg className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 13.5v-1a.5.5 0 0 0-.5-.5H13V5.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H11v6.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V14h6.5a.5.5 0 0 0 .5-.5z" />
                  </svg>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-gray-900"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-gray-700 hover:text-gray-900">
                      {t('nav.login')}
                    </Link>
                    <Link to="/register" className="text-gray-700 hover:text-gray-900">
                      {t('nav.register')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('home.welcome')}</h1>
                <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                  {t('home.subtitle')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="card card-hover flex flex-col justify-between h-full">
                    <div>
                      <div className="mb-4 text-black">
                        <svg className="h-12 w-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 13.5v-1a.5.5 0 0 0-.5-.5H13V5.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H11v6.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V14h6.5a.5.5 0 0 0 .5-.5z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.reportLuggage')}</h2>
                      <p className="text-gray-600 mb-6">
                        {t('home.reportDescription')}
                      </p>
                    </div>
                    <Link
                      to="/report"
                      className="btn btn-primary w-full"
                    >
                      {t('home.fileReport')}
                    </Link>
                  </div>
                  <div className="card card-hover flex flex-col justify-between h-full">
                    <div>
                      <div className="mb-4 text-red-600">
                        <svg className="h-12 w-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.searchLuggage')}</h2>
                      <p className="text-gray-600 mb-6">
                        {t('home.searchDescription')}
                      </p>
                    </div>
                    <Link
                      to="/search"
                      className="btn btn-secondary w-full"
                    >
                      {t('home.searchButton')}
                    </Link>
                  </div>
                </div>
              </div>
            } />
            <Route path="/report" element={<LuggageForm />} />
            <Route path="/search" element={<LuggageSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="bg-white py-8 border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <svg className="h-6 w-6 text-black mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 8h-9m9 0v8m0-8l-4 4m4-4l4 4M4 8h9m-9 0v8m0-8l4 4m-4-4l-4 4" />
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                </svg>
                <span className="font-semibold text-gray-700">{t('common.appName')}</span>
              </div>
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} {t('common.appName')}. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
