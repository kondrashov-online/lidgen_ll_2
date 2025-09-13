import { useState, useEffect } from 'react';

// Generic hook for API calls with loading and error states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || err.message || 'An error occurred');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Hook for mutations (POST, PUT, DELETE)
export const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (apiCall, onSuccess, onError) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiCall();
      
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'An error occurred';
      setError(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

export default { useApi, useMutation };