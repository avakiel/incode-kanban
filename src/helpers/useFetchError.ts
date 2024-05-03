import { useState, useEffect } from 'react';

export const useFetchError = (fetchError: string) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (fetchError) {
      setError(true);
    }
  }, [fetchError]);

  return error;
};