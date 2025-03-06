import React, { useState } from 'react';

interface SearchFormData {
  brand: string;
  color: string;
  airportLocation: string;
  dateLost: string;
}

interface LuggageReport {
  id: number;
  status: string;
  airport_location: string;
  date_lost: string;
  brand: string;
  color: string;
  size: string;
  weight: string;
  distinctive_features: string;
  contents_description: string;
}

const LuggageSearch: React.FC = () => {
  const [searchData, setSearchData] = useState<SearchFormData>({
    brand: '',
    color: '',
    airportLocation: '',
    dateLost: '',
  });

  const [searchResults, setSearchResults] = useState<LuggageReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchData).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`http://localhost:3001/api/luggage/search?${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        alert('Error searching for luggage');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error searching for luggage');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Search Lost Luggage</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Brand
              <input
                type="text"
                name="brand"
                value={searchData.brand}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter brand name"
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Color
              <input
                type="text"
                name="color"
                value={searchData.color}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter color"
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Airport Location
              <input
                type="text"
                name="airportLocation"
                value={searchData.airportLocation}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter airport name"
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date Lost
              <input
                type="date"
                name="dateLost"
                value={searchData.dateLost}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Search Results</h3>
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="border-b pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><strong>Brand:</strong> {result.brand}</p>
                    <p><strong>Color:</strong> {result.color}</p>
                    <p><strong>Size:</strong> {result.size}</p>
                    <p><strong>Weight:</strong> {result.weight}kg</p>
                  </div>
                  <div>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Airport:</strong> {result.airport_location}</p>
                    <p><strong>Date Lost:</strong> {new Date(result.date_lost).toLocaleDateString()}</p>
                  </div>
                </div>
                {result.distinctive_features && (
                  <p className="mt-2"><strong>Distinctive Features:</strong> {result.distinctive_features}</p>
                )}
                {result.contents_description && (
                  <p className="mt-2"><strong>Contents:</strong> {result.contents_description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && !isLoading && (
        <div className="text-center text-gray-600">
          No results found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
};

export default LuggageSearch; 