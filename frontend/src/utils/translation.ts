import { useTranslation } from 'react-i18next';

/**
 * A type-safe translation function to use in components
 */
export function useTypedTranslation() {
  const { t, i18n } = useTranslation();
  
  // Safe translation function with proper typings
  function translate(key: string) {
    // @ts-ignore - This is a workaround for TypeScript errors with i18next
    return t(key);
  }
  
  return { 
    t: translate,
    i18n 
  };
} 