import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

import Workout from "./workout";
import Mobility from "./components/mobility";
import Strength from "./components/strength";
import Dashboard from "./components/Dashboard"; // ✅ Import del componente Dashboard
import logo from './logo.png';  // ✅ Tuo logo

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Workout", path: "/workout", icon: <DirectionsRunIcon /> },
    { text: "Mobility", path: "/mobility", icon: <SelfImprovementIcon /> },
    { text: "Strength", path: "/strength", icon: <DirectionsRunIcon /> },
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
          <h3 style={{ marginLeft: "16px" }}>Fitness App AI</h3>
        </Toolbar>
      </AppBar>
      <h1 class="dashboard-title">Hello Team</h1>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
            >
              {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* ✅ Rotta aggiunta */}
        <Route path="/workout" element={<Workout />} />
        <Route path="/mobility" element={<Mobility />} />
        <Route path="/strength" element={<Strength />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
