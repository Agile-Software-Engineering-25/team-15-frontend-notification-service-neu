import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';
import type { NotificationObject } from '@custom-types/notification-service';

const useApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  const getNotifications = useCallback(async (userId: String) => {
    const response = await axiosInstance.get('/notifications', {
      params: { userId: userId },
    });
    return response.data as NotificationObject[];
  }, [axiosInstance]);

  return { getNotifications };
};

export default useApi;
