import { useTypedSelector } from '@/stores/rootReducer';
import {
  appendNotifications,
  replaceNotifications,
} from '@/stores/slices/notificationSlice';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {
  Typography,
  Stack,
  Dropdown,
  MenuButton,
  Menu,
  Divider,
} from '@mui/joy';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { NotificationObject } from '@custom-types/notification-service';
import NotificationBellBadge from './NotificationBellBadge/NotificationBellBadge';
import { ClickAwayListener } from '@mui/material';
import SingleNotificationSheet from './SingleNotificationSheet/SingleNotificationSheet';
import NotificationModal from '../NotificationModal/NotificationModal';
import useWebSocket from '@/hooks/useWebsocket';
import useApi from '@hooks/useApi';

const NotificationBell = () => {
  const notifications = useTypedSelector((state) => state.notifications.data);
  const dispatch = useDispatch();
  const { getNotifications, markAsRead, markAsUnread } = useApi();
  const { t } = useTranslation();

  const { connectionLost } = useWebSocket();
  const [open, setOpen] = useState(false);

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationObject | null>(null);

  useEffect(() => {
    if (notifications.length > 0) return;

    const populateNotifications = async () => {
      const newNotifications = await getNotifications();
      dispatch(appendNotifications(newNotifications));
    };
    populateNotifications();
  }, []);

  const updateBackend = useCallback(
    async (notificationId: string, read: boolean) => {
      try {
        const notification = read
          ? await markAsRead(notificationId)
          : await markAsUnread(notificationId);
        return {
          ...notification,
          receivedAt: new Date(notification.receivedAt),
          type: notification.notificationType,
        };
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    [markAsRead, markAsUnread]
  );

  const modifyNotification = (notificationId: string, read: boolean) => {
    updateBackend(notificationId, read).then((newNotification) => {
      if (!newNotification) return;
      dispatch(
        replaceNotifications(
          notifications.map((n) =>
            n.id === notificationId ? newNotification : n
          )
        )
      );
      setSelectedNotification((prev) => (prev ? newNotification : null));
    });
  };

  const openNotificationModal = (notification: NotificationObject) => {
    setSelectedNotification(notification); // optional: instantly set readAt, so no delay
    modifyNotification(notification.id, true);
  };

  return (
    <Dropdown
      open={open}
      onOpenChange={(_, isOpen) => {
        if (selectedNotification) return;
        setOpen(isOpen);
      }}
    >
      <MenuButton variant="outlined" sx={{ p: 1.3 }}>
        <NotificationBellBadge
          unreadCount={notifications.filter((n) => !n.readAt).length}
          connectionLost={connectionLost}
        >
          <NotificationsNoneOutlinedIcon />
        </NotificationBellBadge>
      </MenuButton>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <>
          <Menu variant="outlined" sx={{ p: 2, width: '20vw', maxWidth: 700 }}>
            <Stack
              spacing={1}
              sx={{
                height: '60vh',
                overflowY: 'auto',
                maxHeight: '60vh',
                pr: 1,
                boxSizing: 'border-box',
              }}
            >
              <Typography
                component="h6"
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  py: 1,
                }}
              >
                {t('components.notificationBell.title')}
              </Typography>
              <Divider />
              {connectionLost === true ? (
                <Typography
                  component="h6"
                  sx={{ fontSize: '1.125rem', fontWeight: 600, py: 1.5 }}
                  color={'danger'}
                >
                  {t('components.notificationBell.noConnection')}
                </Typography>
              ) : notifications.length === 0 ? (
                <Typography sx={{ fontSize: '0.875rem' }}>
                  {t('components.notificationBell.noNotifications')}
                </Typography>
              ) : (
                notifications
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.receivedAt).getTime() -
                      new Date(a.receivedAt).getTime()
                  )
                  .map((n: NotificationObject) => (
                    <SingleNotificationSheet
                      notification={n}
                      openNotificationModal={openNotificationModal}
                    />
                  ))
              )}
            </Stack>
          </Menu>
          <NotificationModal
            notification={selectedNotification}
            setSelectedNotification={setSelectedNotification}
            modifyNotification={modifyNotification}
          />
        </>
      </ClickAwayListener>
    </Dropdown>
  );
};

export default NotificationBell;
