import type { NotificationObject } from '@/@custom-types/notification-service';
import { Backdrop, Button, Dialog, Divider, Modal, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

const NotificationModal = ({
  notification,
  setSelectedNotification,
  modifyNotification,
}: {
  notification: NotificationObject | null;
  setSelectedNotification: (notification: NotificationObject | null) => void;
  modifyNotification: (notificationId: string, read: boolean) => void;
}) => {
  return <Dialog
    open={!!notification}
    onClose={() => setSelectedNotification(null)}
    slotProps={{
      paper: {
        style: {
          borderRadius: 18
        }
      }
    }}
  >
    {notification && <Stack style={{ padding: 24 }}>
      <Stack
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: "row",
          alignItems: 'center',
          gap: '60px',
          marginBottom: '15px',
        }}
      >
        <Typography style={{ fontSize: '1.5rem', margin: 0, fontWeight: 600 }}>
          {t('components.notificationModal.name')}
        </Typography>
        <Button
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
          }}
          onClick={() => modifyNotification(notification.id, !notification.readAt)}
        >
          {notification.readAt
            ? t('components.notificationModal.markAsUnread')
            : t('components.notificationModal.markAsRead')}
        </Button>
      </Stack>

      <Divider />

      <Stack style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Stack
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack
            style={{
              background: '#e8e8e8',
              padding: 10,
              borderRadius: '12px',
              width: '100%',
            }}
          >
            <Typography style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>
              {t('components.notificationModal.title')}
            </Typography>
            <Typography style={{ fontSize: '1.1rem', margin: 0, fontWeight: 400, wordBreak: 'break-word', maxWidth: '400px' }}>
              {notification.title}
            </Typography>
          </Stack>
          <Stack
            style={{
              background: '#e8e8e8',
              padding: 10,
              borderRadius: '12px',
              width: '100%',
            }}
          >
            <Typography style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>
              {t('components.notificationModal.description')}
            </Typography>
            <Typography style={{ fontSize: '1.1rem', margin: 0, fontWeight: 400, wordBreak: 'break-word', maxWidth: '400px' }}>
              {notification.shortDescription}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          style={{
            background: '#e8e8e8',
            padding: 10,
            borderRadius: '12px',

          }}
        >
          <Typography style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}>
            {t('components.notificationModal.message')}
          </Typography>
          <Typography style={{ fontSize: '1.1rem', margin: 0, fontWeight: 400, wordBreak: 'break-word', maxWidth: '400px' }}>
            {notification.message}
          </Typography>
        </Stack>
      </Stack>

      <Stack style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <Button
          onClick={() => {
            setSelectedNotification(null);
          }}
          style={{
            background: '#0d2f6b',
            color: '#fff',
            border: 'none',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 800,
            fontSize: '0.8rem',
            padding: '10px',
            borderRadius: '8px',
            width: '100%',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          {t('components.notificationModal.close')}
        </Button>
      </Stack>
    </Stack>}
  </Dialog>

};

export default NotificationModal;
