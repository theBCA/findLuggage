import React, { useState } from 'react';

interface LuggageFormData {
  brand: string;
  color: string;
  size: string;
  weight: string;
  airportLocation: string;
  dateLost: string;
  distinctiveFeatures: string;
  contentsDescription: string;
}

const LuggageForm: React.FC = () => {
  const [formData, setFormData] = useState<LuggageFormData>({
    brand: '',
    color: '',
    size: '',
    weight: '',
    airportLocation: '',
    dateLost: '',
    distinctiveFeatures: '',
    contentsDescription: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/luggage/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Luggage report submitted successfully!');
        // Reset form
        setFormData({
          brand: '',
          color: '',
          size: '',
          weight: '',
          airportLocation: '',
          dateLost: '',
          distinctiveFeatures: '',
          contentsDescription: '',
        });
      } else {
        alert('Error submitting report');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting report');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Report Lost Luggage</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Brand
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Color
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Size
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Weight (kg)
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Airport Location
          <input
            type="text"
            name="airportLocation"
            value={formData.airportLocation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Date Lost
          <input
            type="date"
            name="dateLost"
            value={formData.dateLost}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Distinctive Features
          <textarea
            name="distinctiveFeatures"
            value={formData.distinctiveFeatures}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Contents Description
          <textarea
            name="contentsDescription"
            value={formData.contentsDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Submit Report
      </button>
    </form>
  );
};

export default LuggageForm; 