import useApi from '@hooks/useApi';
import { useTypedSelector } from '@/stores/rootReducer';
import { appendNotifications } from '@/stores/slices/notificationSlice';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Sheet, Typography, Stack, Dropdown, MenuButton, Menu } from '@mui/joy';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { NotificationObject } from '@custom-types/notification-service';

const NotificationBell = () => {
  let notifications = useTypedSelector((state) => state.notifications.data);
  let dispatch = useDispatch();
  let { getNotifications } = useApi();
  let { t } = useTranslation();

  useEffect(() => {
    if (notifications.length > 0) return;

    let populateNotifications = async () => {
      let newNotifications = await getNotifications();
      dispatch(appendNotifications(newNotifications));
    };
    populateNotifications();
  }, []);

  return (
    <Dropdown>
      <MenuButton variant="outlined" sx={{ p: 1.3 }}>
        <NotificationsNoneOutlinedIcon />
      </MenuButton>
      <Menu variant="outlined" sx={{ p: 2, width: 300 }}>
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
            sx={{ fontSize: '1.125rem', fontWeight: 600 }}
          >
            {t('components.notificationBell.title')}
          </Typography>
          {notifications.length === 0 ? (
            <Typography sx={{ fontSize: '0.875rem' }}>
              {t('components.notificationBell.noNotifications')}
            </Typography>
          ) : (
            notifications.map((n: NotificationObject) => (
              <Sheet key={n.id} sx={{ p: 1 }} variant="outlined">
                <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
                  {n.title}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem' }}>
                  {n.shortDescription}
                </Typography>
              </Sheet>
            ))
          )}
        </Stack>
      </Menu>
    </Dropdown>
  );
};

export default NotificationBell;
