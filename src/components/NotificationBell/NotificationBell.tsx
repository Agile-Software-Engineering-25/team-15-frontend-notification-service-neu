import useApi from '@hooks/useApi';
import { useTypedSelector } from '@/stores/rootReducer';
import { setNotifications } from '@/stores/slices/notificationSlice';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Button } from '@mui/joy';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const NotificationBell = () => {
  let notifications = useTypedSelector((state) => state.notifications.data);
  let dispatch = useDispatch();
  let { getNotifications } = useApi();

  useEffect(() => {
    if (notifications.length > 0) return;

    let populateNotifications = async () => {
      let newNotifications = await getNotifications();
      dispatch(setNotifications(newNotifications));
    };
    populateNotifications();
  }, []);

  return (
    <Button>
      <NotificationsNoneOutlinedIcon />
    </Button>
  );
};

export default NotificationBell;
