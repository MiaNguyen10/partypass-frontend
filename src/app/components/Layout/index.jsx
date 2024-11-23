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
import { Link } from "react-router-dom";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {["Home", "Tickets", "Users", "Institutions"].map((text) => (
          <ListItem
            button
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
