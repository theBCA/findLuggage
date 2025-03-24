import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LuggageForm from './components/LuggageForm';
import LuggageSearch from './components/LuggageSearch';
import Login from './components/Login';
import Register from './components/Register';
import LanguageSelector from './components/LanguageSelector';
import { useTypedTranslation } from './utils/translation';

function App() {
  const { t } = useTypedTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md header-shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <svg className="h-8 w-8 text-black mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 8h-9m9 0v8m0-8l-4 4m4-4l4 4M4 8h9m-9 0v8m0-8l4 4m-4-4l-4 4" />
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                  </svg>
                  <span className="text-xl font-bold text-black">{t('common.appName')}</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/report" className="nav-link">{t('navigation.report')}</Link>
                <Link to="/search" className="nav-link">{t('navigation.search')}</Link>
                <Link to="/login" className="nav-link">{t('navigation.login')}</Link>
                <Link to="/register" className="btn btn-primary">{t('navigation.register')}</Link>
                <LanguageSelector />
              </div>
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/report" className="block py-2 nav-link" onClick={() => setMobileMenuOpen(false)}>{t('navigation.report')}</Link>
                <Link to="/search" className="block py-2 nav-link" onClick={() => setMobileMenuOpen(false)}>{t('navigation.search')}</Link>
                <Link to="/login" className="block py-2 nav-link" onClick={() => setMobileMenuOpen(false)}>{t('navigation.login')}</Link>
                <Link to="/register" className="block py-2 text-black font-semibold" onClick={() => setMobileMenuOpen(false)}>{t('navigation.register')}</Link>
                <div className="py-2">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          )}
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
                  <div className="card card-hover">
                    <div className="mb-4 text-black">
                      <svg className="h-12 w-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 13.5v-1a.5.5 0 0 0-.5-.5H13V5.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H11v6.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V14h6.5a.5.5 0 0 0 .5-.5z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.reportLuggage')}</h2>
                    <p className="text-gray-600 mb-6">
                      {t('home.reportDescription')}
                    </p>
                    <Link
                      to="/report"
                      className="btn btn-primary w-full"
                    >
                      {t('home.fileReport')}
                    </Link>
                  </div>
                  <div className="card card-hover">
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
