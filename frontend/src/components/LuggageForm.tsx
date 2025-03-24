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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess('');
    
    try {
      const response = await fetch('http://localhost:5000/api/luggage/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSuccess(t('luggage.reportSuccess'));
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
    } finally {
      setIsSubmitting(false);
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('luggage.reportLuggage')}</h1>
        <p className="text-gray-600">{t('home.reportDescription')}</p>
      </div>
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('luggage.brand')}
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('luggage.color')}
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('luggage.size')}
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('luggage.weight')}
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                min="0"
                step="0.1"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('luggage.airportLocation')}
              <input
                type="text"
                name="airportLocation"
                value={formData.airportLocation}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('luggage.dateLost')}
              <input
                type="date"
                name="dateLost"
                value={formData.dateLost}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            {t('luggage.distinctiveFeatures')}
            <textarea
              name="distinctiveFeatures"
              value={formData.distinctiveFeatures}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              rows={3}
              placeholder="e.g., blue stripe, red tag, broken handle"
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            {t('luggage.contentsDescription')}
            <textarea
              name="contentsDescription"
              value={formData.contentsDescription}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              rows={3}
              placeholder="e.g., clothing, electronics, books"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('common.loading')}
            </>
          ) : (
            t('luggage.reportButton')
          )}
        </button>
      </form>
    </div>
  );
};

export default LuggageForm; 