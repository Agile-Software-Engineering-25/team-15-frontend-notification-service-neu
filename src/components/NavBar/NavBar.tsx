import App from '@/App';
import { Box, Button, Stack } from '@mui/joy';
import LanguageSelectorComponent from '../LanguageSelectorComponent/LanguageSelectorComponent';

const navBarElements = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/',
  },
  {
    name: 'Prüfungen',
    path: '/',
  },
  {
    name: 'Raum Buchung',
    path: '/',
  },
  {
    name: 'Document Management',
    path: '/',
  },
];

const NavBar = () => {
  return (
    <Stack
      id={'navbar'}
      direction={'row'}
      alignItems={'center'}
      spacing={1}
      sx={{
        height: '68px',
        px: '25px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        boxSizing: 'border-box',
      }}
    >
      <Stack
        direction={'row'}
        component={'nav'}
        gap={'74px'}
        alignItems={'center'}
        sx={{ flex: 1 }}
      >
        <img
          src="/provadis-icon.svg"
          alt={'Provadis Logo'}
          style={{ height: '36px', cursor: 'pointer' }}
        />
        {navBarElements.map((element) => (
          <Button
            key={element.name}
            variant="outlined"
            sx={{
              fontSize: '16px',
              userSelect: 'none',
              color: 'rgb(50, 56, 62)',
              ':hover': {
                color: 'primary.500',
                cursor: 'pointer',
                textDecoration: 'none',
              },
            }}
          >
            {element.name}
          </Button>
        ))}
        <LanguageSelectorComponent />
        <Box sx={{ alignItems: 'right', marginLeft: 'auto', display: 'flex' }}>
          <App />
        </Box>
      </Stack>
    </Stack>
  );
};

export default NavBar;
