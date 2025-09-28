import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';
import type { NotificationObject } from '@custom-types/notification-service';

const useApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);

  const getNotifications = useCallback(async () => {
    const response = await axiosInstance.get('/notifications', {
      params: { userId: '1' }, // Replace this with the id of the logged-in user
    });

    const normalized = response.data.map((notification: any) => ({
      ...notification,
      receivedAt: new Date(notification.receivedAt),
      type: notification.notificationType,
    })) as NotificationObject[];
    return normalized;
  }, [axiosInstance]);

  return { getNotifications };
};

export default useApi;
