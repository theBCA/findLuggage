import React, { useState } from 'react';

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
  const [searchData, setSearchData] = useState<SearchFormData>({
    type: '',
    color: '',
    location: '',
    dateFound: '',
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

      const response = await fetch(`http://localhost:5000/api/luggage?${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.luggage);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
              Type
              <select
                name="type"
                value={searchData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="suitcase">Suitcase</option>
                <option value="backpack">Backpack</option>
                <option value="handbag">Handbag</option>
                <option value="other">Other</option>
              </select>
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
              Location
              <input
                type="text"
                name="location"
                value={searchData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter location"
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date Found
              <input
                type="date"
                name="dateFound"
                value={searchData.dateFound}
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
              <div key={result._id} className="border-b pb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p><strong>Type:</strong> {result.type}</p>
                    <p><strong>Color:</strong> {result.color}</p>
                    <p><strong>Brand:</strong> {result.brand}</p>
                    <p><strong>Description:</strong> {result.description}</p>
                  </div>
                  <div>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Location:</strong> {result.location}</p>
                    <p><strong>Date Found:</strong> {new Date(result.dateFound).toLocaleDateString()}</p>
                    <p><strong>Contact:</strong> {result.contactInfo.name} ({result.contactInfo.email})</p>
                  </div>
                </div>
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