import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedTranslation } from '../utils/translation';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { t } = useTypedTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.passwordsDoNotMatch'));
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.registrationFailed'));
      }

      // Store token
      setVerificationToken(data.token);
      
      // Set registered email for verification
      setRegisteredEmail(formData.email);

      // Show success message
      setSuccess(t('auth.registrationInitiated'));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Show OTP popup instead of redirecting
      setShowOtpPopup(true);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : t('auth.registrationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: registeredEmail, 
          otp 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.verificationFailed'));
      }

      // Save verification token to localStorage
      localStorage.setItem('token', verificationToken);

      // Show success message
      setSuccess(t('auth.emailVerified'));
      
      // Close OTP popup and clear OTP
      setShowOtpPopup(false);
      setOtp('');

      // Redirect to home page after a delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : t('auth.verificationFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: registeredEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.resendOtpFailed'));
      }

      setSuccess(t('auth.otpResendSuccess'));
    } catch (error) {
      setError(error instanceof Error ? error.message : t('auth.resendOtpFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {!showOtpPopup ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">{t('auth.registerTitle')}</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t('auth.name')}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t('auth.email')}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t('auth.password')}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
                minLength={6}
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t('auth.confirmPassword')}
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
                required
                minLength={6}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? t('common.loading') : t('auth.registerTitle')}
          </button>

          <p className="mt-4 text-center text-gray-600">
            {t('auth.haveAccount')}{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              {t('auth.loginHere')}
            </a>
          </p>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">{t('auth.otpTitle')}</h2>
          
          <p className="text-gray-600 mb-4">
            {t('auth.otpMessage')} <strong>{registeredEmail}</strong>
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleVerifyOtp}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('auth.otpPlaceholder')}
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder={t('auth.otpPlaceholder')}
                  required
                  maxLength={6}
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mb-4"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('auth.otpVerify')}
            </button>

            <div className="flex justify-between">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600"
                onClick={() => setShowOtpPopup(false)}
              >
                {t('auth.otpBack')}
              </button>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-600"
                onClick={handleResendOTP}
                disabled={isLoading}
              >
                {t('auth.otpResend')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register; 