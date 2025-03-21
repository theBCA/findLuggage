import React, { useState } from 'react';
import { useTypedTranslation } from '../utils/translation';

interface SearchFormData {
  type: string;
  color: string;
  location: string;
  dateFound: string;
}

interface LuggageReport {
  _id: string;
  type: string;
  color: string;
  brand: string;
  description: string;
  status: string;
  location: string;
  dateFound: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const LuggageSearch: React.FC = () => {
  const { t } = useTypedTranslation();
  const [searchData, setSearchData] = useState<SearchFormData>({
    type: '',
    color: '',
    location: '',
    dateFound: '',
  });

  const [searchResults, setSearchResults] = useState<LuggageReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchData).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`http://localhost:5000/api/luggage?${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.luggage);
      } else {
        alert(t('common.error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('luggage.searchLuggage')}</h1>
        <p className="text-gray-600">{t('home.searchDescription')}</p>
      </div>
      
      <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-100 p-6 fade-in">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t('luggage.type')}
                <select
                  name="type"
                  value={searchData.type}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md"
                >
                  <option value="">{t('luggage.selectType')}</option>
                  <option value="suitcase">{t('luggage.types.suitcase')}</option>
                  <option value="backpack">{t('luggage.types.backpack')}</option>
                  <option value="handbag">{t('luggage.types.handbag')}</option>
                  <option value="other">{t('luggage.types.other')}</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t('luggage.color')}
                <input
                  type="text"
                  name="color"
                  value={searchData.color}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder={t('luggage.enterColor')}
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t('luggage.location')}
                <input
                  type="text"
                  name="location"
                  value={searchData.location}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder={t('luggage.enterLocation')}
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t('luggage.dateFound')}
                <input
                  type="date"
                  name="dateFound"
                  value={searchData.dateFound}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-3 px-4 rounded-md hover:bg-sky-600 transition-colors font-medium flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('common.loading')}
              </>
            ) : (
              t('luggage.searchButton')
            )}
          </button>
        </form>
      </div>

      {hasSearched && (
        <>
          {searchResults.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">{t('luggage.searchResults')}</h3>
              <div className="space-y-6">
                {searchResults.map((result) => (
                  <div key={result._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="p-2 rounded-full bg-indigo-100 text-indigo-500 mr-2">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">{t(`luggage.types.${result.type}`)}</span>
                        </div>
                        <p className="text-sm mb-1"><span className="font-medium">{t('luggage.color')}:</span> {result.color}</p>
                        <p className="text-sm mb-1"><span className="font-medium">{t('luggage.brand')}:</span> {result.brand}</p>
                        <p className="text-sm"><span className="font-medium">{t('luggage.description')}:</span> {result.description}</p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <div className={`p-1 px-2 rounded-full text-xs font-medium ${
                            result.status === 'found' 
                              ? 'bg-green-100 text-green-800' 
                              : result.status === 'claimed' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {t(`luggage.statuses.${result.status}`)}
                          </div>
                        </div>
                        <p className="text-sm mb-1"><span className="font-medium">{t('luggage.location')}:</span> {result.location}</p>
                        <p className="text-sm mb-1"><span className="font-medium">{t('luggage.dateFound')}:</span> {new Date(result.dateFound).toLocaleDateString()}</p>
                        <p className="text-sm">
                          <span className="font-medium">{t('luggage.contactInfo')}:</span>{' '}
                          <a href={`mailto:${result.contactInfo.email}`} className="text-indigo-600 hover:underline">
                            {result.contactInfo.name}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 text-center fade-in">
              <div className="text-gray-500 my-6">
                <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg">{t('luggage.noResults')}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LuggageSearch; 