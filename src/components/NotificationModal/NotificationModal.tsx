import type { NotificationObject } from '@/@custom-types/notification-service';
import { Modal } from '@agile-software/shared-components';
import { Button, Stack, Typography } from '@mui/joy';
import { t } from 'i18next';

const NotificationModal = ({
  notification,
  setSelectedNotification,
  modifyNotification,
}: {
  notification: NotificationObject | null;
  setSelectedNotification: (notification: NotificationObject | null) => void;
  modifyNotification: (notificationId: string, read: boolean) => void;
}) => {
  return (
    <Modal
      header={t('components.notificationModal.name')}
      open={!!notification}
      setOpen={() => setSelectedNotification(null)}
      modalDialogSX={{ maxWidth: '600px', width: '90%', maxHeight: '90%' }}
      modalSX={{ zIndex: 1000 }}
    >
      {notification && (
        <Stack>
          <Button
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              cursor: 'pointer',
              alignSelf: 'flex-end',
              position: 'absolute',
              top: '20px',
              right: '50px',
            }}
            onClick={() =>
              modifyNotification(notification.id, !notification.readAt)
            }
          >
            {notification.readAt
              ? t('components.notificationModal.markAsUnread')
              : t('components.notificationModal.markAsRead')}
          </Button>
          <Stack
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <Stack
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                marginTop: 10,
                alignItems: 'center',
                height: '100%',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Stack
                style={{
                  background: '#e8e8e8',
                  padding: 10,
                  borderRadius: '12px',
                  height: '-webkit-fill-available',
                  width: '100%',
                }}
              >
                <Typography
                  style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}
                >
                  {t('components.notificationModal.title')}
                </Typography>
                <Typography
                  style={{
                    fontSize: '1.1rem',
                    margin: 0,
                    fontWeight: 400,
                    wordBreak: 'break-word',
                    maxWidth: '400px',
                  }}
                >
                  {notification.title}
                </Typography>
              </Stack>
              <Stack
                style={{
                  background: '#e8e8e8',
                  padding: 10,
                  borderRadius: '12px',
                  width: '100%',
                  height: '-webkit-fill-available',
                }}
              >
                <Typography
                  style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}
                >
                  {t('components.notificationModal.description')}
                </Typography>
                <Typography
                  style={{
                    fontSize: '1.1rem',
                    margin: 0,
                    fontWeight: 400,
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    maxWidth: '200px',
                  }}
                >
                  {notification.shortDescription}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              style={{
                background: '#e8e8e8',
                padding: 10,
                borderRadius: '12px',
                height: '100%',
              }}
            >
              <Typography
                style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600 }}
              >
                {t('components.notificationModal.message')}
              </Typography>
              <Typography
                style={{
                  fontSize: '1.1rem',
                  margin: 0,
                  fontWeight: 400,
                  wordBreak: 'break-word',
                  maxWidth: '400px',
                }}
              >
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
        </Stack>
      )}
    </Modal>
  );
};

export default NotificationModal;
