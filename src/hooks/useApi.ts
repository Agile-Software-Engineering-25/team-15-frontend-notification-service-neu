import useAxiosInstance from '@hooks/useAxiosInstance';
import { BACKEND_BASE_URL } from '@/config';
import { useCallback } from 'react';
import type { NotificationObject } from '@custom-types/notification-service';

const useApi = () => {
  const axiosInstance = useAxiosInstance(BACKEND_BASE_URL);
  const userId = '1'; // TODO get userId from JWT via context

  const getNotifications = useCallback(async () => {
    const response = await axiosInstance.get('/notifications', {
      params: { userId: userId },
    });

    const normalized = response.data.map((notification: any) => ({
      ...notification,
      receivedAt: new Date(notification.receivedAt),
      type: notification.notificationType,
    })) as NotificationObject[];
    return normalized;
  }, [axiosInstance]);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      const response = await axiosInstance.post(
        `/notifications/mark-as-read/${notificationId}`
      );
      return response.status == 200 ? response.data : false;
    },
    [axiosInstance]
  );

  const markAsUnread = useCallback(
    async (notificationId: string) => {
      const response = await axiosInstance.post(
        `/notifications/mark-as-unread/${notificationId}`
      );
      return response.status == 200 ? response.data : false;
    },
    [axiosInstance]
  );

  return { getNotifications, markAsRead, markAsUnread };
};

export default useApi;
