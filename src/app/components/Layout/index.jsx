import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../Button/LogoutButton";
import { useDispatch } from "react-redux";
import { logout } from "../../../core/reducers/authenticate/authenticateSlice";
import pages from "../../config/pages";
import { jwtDecode } from "jwt-decode";

const drawerWidth = 200;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 10, // Shift the content for larger screens
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "@media (max-width: 1280px)": {
    marginLeft: 0,
  },
}));

const DrawerContainer = styled("nav")(() => ({
  width: drawerWidth,
  flexShrink: 0,
  [`@media (max-width: 1280px)`]: {
    width: 0,
  },
}));

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const userName = jwtDecode(token).name;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(pages.loginPath);
  };

  const drawer = (
    <div>
      <List>
        {["Home", "Tickets", "Users", "Institutions", "Lockers"].map((text) => (
          <ListItem
            key={text}
            component={Link}
            to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="flex h-screen">
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { xl: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Party Pass Admin Page
              </Typography>
            </div>
            <div className="flex items-center space-x-4">
              <Typography noWrap>
                {userName}
              </Typography>
              <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <DrawerContainer>
        {/* Drawer for mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className="xl:hidden"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{ style: { width: drawerWidth } }} // Set drawer width for mobile
        >
          <Toolbar />
          {drawer}
        </Drawer>
        {/* Drawer for desktop */}
        <Drawer
          variant="permanent"
          className="hidden xl:block"
          open
          PaperProps={{ style: { width: drawerWidth } }} // Set drawer width for desktop
        >
          <Toolbar />
          {drawer}
        </Drawer>
      </DrawerContainer>
      <Main>
        <Toolbar />
        {children}
      </Main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
