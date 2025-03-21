import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LuggageForm from './components/LuggageForm';
import LuggageSearch from './components/LuggageSearch';
import Login from './components/Login';
import Register from './components/Register';
import LanguageSelector from './components/LanguageSelector';
import { useTypedTranslation } from './utils/translation';

function App() {
  const { t } = useTypedTranslation();
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">{t('common.appName')}</Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/report" className="text-gray-600 hover:text-gray-900">{t('navigation.report')}</Link>
                <Link to="/search" className="text-gray-600 hover:text-gray-900">{t('navigation.search')}</Link>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">{t('navigation.login')}</Link>
                <Link to="/register" className="btn btn-primary">{t('navigation.register')}</Link>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('home.welcome')}</h1>
                <p className="text-xl text-gray-600 mb-8">
                  {t('home.subtitle')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="card card-hover">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.reportLuggage')}</h2>
                    <p className="text-gray-600 mb-6">
                      {t('home.reportDescription')}
                    </p>
                    <Link
                      to="/report"
                      className="btn btn-primary"
                    >
                      {t('home.fileReport')}
                    </Link>
                  </div>
                  <div className="card card-hover">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('home.searchLuggage')}</h2>
                    <p className="text-gray-600 mb-6">
                      {t('home.searchDescription')}
                    </p>
                    <Link
                      to="/search"
                      className="btn btn-secondary"
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
      </div>
    </Router>
  );
}

export default App;
