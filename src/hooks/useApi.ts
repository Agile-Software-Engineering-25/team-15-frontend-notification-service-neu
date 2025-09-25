import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';
import type { NotificationObject } from '@custom-types/notification-service';

const useApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  const getNotifications = useCallback(async () => {
    const response = await axiosInstance.get('/notifications', {
      headers: { 'X-User-Id': '1' }, // Replace this with the id of the logged-in user
    });
    return response.data as NotificationObject[];
  }, [axiosInstance]);

  return { getNotifications };
};

export default useApi;
