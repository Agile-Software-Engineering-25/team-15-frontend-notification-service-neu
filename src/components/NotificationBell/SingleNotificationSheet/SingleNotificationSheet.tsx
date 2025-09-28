import { Avatar, Button, Stack, Typography } from '@mui/joy';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import type { NotificationObject } from '@custom-types/notification-service';
import { useTranslation } from 'react-i18next';

const NotificationTypeIconMap: Record<string, JSX.Element> = {
  Info: <InfoOutlineIcon color="info" />,
  Warning: <WarningAmberOutlinedIcon color="warning" />,
  Congratulation: <CelebrationOutlinedIcon color="success" />,
  None: <NotificationsNoneOutlinedIcon color="info" />,
};

interface SingleNotificationSheetProps {
  notification: NotificationObject;
}

const SingleNotificationSheet = ({
  notification,
}: SingleNotificationSheetProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: 'components.notificationBell.singleNotificationSheet',
  });

  function formatReceivedAt(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    switch (true) {
      case diffInMinutes < 1:
        return t('timestamp.justNow', { count: 1 });
      case diffInMinutes < 2:
        return t('timestamp.minutesAgo', { count: 1 });
      case diffInMinutes < 60:
        return t('timestamp.minutesAgoPlural', { count: diffInMinutes });
      case diffInHours < 2:
        return t('timestamp.hoursAgo', { count: 1 });
      case diffInHours < 24:
        return t('timestamp.hoursAgoPlural', { count: diffInHours });
      case diffInDays < 2:
        return t('timestamp.daysAgo', { count: 1 });
      default:
        return t('timestamp.daysAgoPlural', { count: diffInDays });
    }
  }

  return (
    <Button
      key={notification.id}
      sx={{
        py: 6,
        justifyContent: 'flex-start',
        width: '100%',
      }}
      variant="plain"
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ width: '100%', alignItems: 'flex-start' }}
      >
        <Avatar size="lg" variant="outlined">
          {NotificationTypeIconMap[notification.type]}
        </Avatar>
        <Stack sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 500,
              textAlign: 'left',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {notification.title}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              marginTop: 0.4,
            }}
            textAlign={'left'}
          >
            {notification.shortDescription}
          </Typography>
          <Typography
            sx={{ fontSize: '0.75rem', marginTop: 3 }}
            alignSelf={'flex-start'}
            color="neutral"
          >
            {formatReceivedAt(notification.receivedAt)}
          </Typography>
        </Stack>
      </Stack>
    </Button>
  );
};

export default SingleNotificationSheet;
