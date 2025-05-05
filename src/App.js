import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { IoShieldCheckmark } from 'react-icons/io5'; 
import { IoMdBody } from 'react-icons/io';
import Workout from "./workout";
import Mobility from "./components/mobility";
import Strength from "./components/strength";
import Speed from "./components/Speed";
import Prevention from "./components/Prevention";
import Dashboard from "./components/Dashboard"; // ✅ Import del componente Dashboard
import { BiBandAid } from "react-icons/bi";
import { CiDumbbell } from "react-icons/ci";
import { BiSolidSpreadsheet } from "react-icons/bi";
import logo from './logo.png';  // ✅ Tuo logo
import BoltIcon from "@mui/icons-material/Bolt";
import styles from './App.module.css';
import './App.css'; // oppure il file dove c'è .outlined-title


function PreventionIcon() {
  
  return <IoShieldCheckmark size="80" color="green" />;
}
function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Workout", path: "/workout", icon: <BiSolidSpreadsheet /> },
    { text: "Mobility", path: "/mobility", icon: <SelfImprovementIcon /> },
    { text: "Strength", path: "/strength", icon: < CiDumbbell /> },
    { text: "Speed", path: "/Speed", icon: <BoltIcon /> },
    { text: "Prevention", path: "/prevention", icon: <BiBandAid /> },
  ];

  return (
    <Router>
      <AppBar position="static" style={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          {/* LOGO */}
          <img src={logo} alt="Logo" style={{ height: "90px", marginLeft: "16px", marginRight: "16px" }} />
          <h1 className={styles.outlinedTitle}>Fitness App AI</h1>
        </Toolbar>
      </AppBar>
      <h1 class="dashboard-title">Hello Team!</h1>
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
        <Route path="/Speed" element={<Speed />} />
        <Route path="/Prevention" element={<Prevention />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
