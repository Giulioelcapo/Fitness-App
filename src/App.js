import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Workout from "./workout";
import Mobility from "./mobility";
import Strength from "./components/strength";
import logo from './logo.png';  // Replace with the actual path to your logo image

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Workout", path: "/workout" },
    { text: "Mobility", path: "/mobility" },
    { text: "Strength", path: "/strength" },
  ];

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          {/* LOGO */}
          <img src={logo} alt="Logo" style={{ height: "80px", marginLeft: "16px", marginRight: "16px" }} />
          <h3 style={{ marginLeft: "16px" }}>Fitness App</h3>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Routes>
        <Route path="/workout" element={<Workout />} />
        <Route path="/mobility" element={<Mobility />} />
        <Route path="/strength" element={<Strength />} />
      </Routes>
    </Router>
  );
}

export default App;