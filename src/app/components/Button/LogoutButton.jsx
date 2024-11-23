import { Button, styled } from '@mui/material';

const LogoutButton = styled(Button)(() => ({
  backgroundColor: 'transparent',
  backgroundImage: 'linear-gradient(#fff, #f5f5fa)',
  border: '0 solid #003dff',
  borderRadius: '9999px',
  boxShadow: 'rgba(37, 44, 97, .15) 0 4px 11px 0, rgba(93, 100, 148, .2) 0 1px 3px 0',
  boxSizing: 'border-box',
  color: '#484c7a',
  cursor: 'pointer',
  display: 'inline-block',
  fontFamily: 'Hind, system-ui, BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  fontWeight: 600,
  margin: '4px',
  padding: '16px 24px',
  textAlign: 'center',
  textDecoration: 'inherit',
  textWrap: 'nowrap',
  transition: 'all .2s ease-out',
  transitionBehavior: 'normal',
  whiteSpaceCollapse: 'collapse',
  lineHeight: 1.15,
  '&:hover': {
    boxShadow: 'rgba(37, 44, 97, .15) 0 8px 22px 0, rgba(93, 100, 148, .2) 0 4px 6px 0',
  },
  '&:disabled': {
    cursor: 'not-allowed',
    opacity: .5,
  },
  '@media (min-width: 576px)': {
    paddingBottom: '10px',
    paddingTop: '10px',
  },
}));

export default LogoutButton;


