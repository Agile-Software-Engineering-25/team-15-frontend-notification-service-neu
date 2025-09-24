import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';

const useApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  const getNotifications = useCallback(async () => {
    const response = await axiosInstance.get('/notifications', {
      headers: { 'X-User-Id': '1' }, // Replace this with the id of the logged-in user
    });
    return response.data as Notification[];
  }, [axiosInstance]);

  return { getNotifications };
};

export default useApi;
