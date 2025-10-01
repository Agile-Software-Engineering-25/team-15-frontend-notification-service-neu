import { Badge, Typography } from '@mui/joy';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface NotificationBellBadgeProps {
  children: React.ReactNode;
  unreadCount: number;
  connectionLost: boolean;
}

const NotificationBellBadge = ({ children, unreadCount, connectionLost }: NotificationBellBadgeProps) => {
  return unreadCount === 0 && (!connectionLost)? (
    <>{children}</>
  ) : (
    <Badge
      badgeContent={
        connectionLost ? (
          <Typography
          sx={{color: 'white'}}><PriorityHighIcon sx={{ fontSize: 14 }}/></Typography>
        ) : unreadCount > 99 ? (
          <Typography>{'99+'}</Typography>
        ) : (
          <Typography sx={{ color: 'var(--joy-palette-warning-200)' }}>
            {unreadCount}
          </Typography>
        )
      }
      color={connectionLost ? 'danger' : 'warning'}
      size="sm"
    >
      {children}
    </Badge>
  );
};

export default NotificationBellBadge;
