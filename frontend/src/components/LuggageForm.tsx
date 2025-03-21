import React, { useState } from 'react';
import { useTypedTranslation } from '../utils/translation';

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
  const { t } = useTypedTranslation();
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
      const response = await fetch('http://localhost:5000/api/luggage/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert(t('luggage.reportSuccess'));
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
        alert(t('common.error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert(t('common.error'));
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
      <h2 className="text-2xl font-bold mb-6">{t('luggage.reportLuggage')}</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t('luggage.brand')}
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
          {t('luggage.color')}
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
          {t('luggage.size')}
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
          {t('luggage.weight')}
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
          {t('luggage.airportLocation')}
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
          {t('luggage.dateLost')}
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
          {t('luggage.distinctiveFeatures')}
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
          {t('luggage.contentsDescription')}
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
        {t('luggage.reportButton')}
      </button>
    </form>
  );
};

export default LuggageForm; 