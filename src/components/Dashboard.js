import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import BoltIcon from "@mui/icons-material/Bolt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SponsorBanner from "../components/SponsorBanner";

const weeklyFocus = [
  { label: "MD+1", focus: "Mobility", color: "#4FC3F7", icon: <SelfImprovementIcon fontSize="large" /> },
  { label: "MD+2", focus: "Strength & Plyo", color: "#FFD54F", icon: <BoltIcon fontSize="large" /> },
  { label: "MD+3", focus: "Strength", color: "#E57373", icon: <FitnessCenterIcon fontSize="large" /> },
  { label: "MD-3", focus: "Power", color: "#81C784", icon: <BoltIcon fontSize="large" /> },
  { label: "MD-2", focus: "Speed", color: "#BA68C8", icon: <DirectionsRunIcon fontSize="large" /> },
  { label: "MD-1", focus: "Light Prep", color: "#FFF176", icon: <EventAvailableIcon fontSize="large" /> },
  { label: "MD", focus: "Match", color: "#90A4AE", icon: <SportsSoccerIcon fontSize="large" /> },
];

const monthlyFocus = [
  { month: "January", focus: "Strength", color: "#E57373", icon: <FitnessCenterIcon fontSize="large" /> },
  { month: "February", focus: "Strength ecc", color: "#FFD54F", icon: <FitnessCenterIcon fontSize="large" /> },
  { month: "Mars", focus: "Strength ecc", color: "#81C784", icon: <FitnessCenterIcon fontSize="large" /> },
  { month: "April", focus: "Strength endurance", color: "#E57373", icon: <FitnessCenterIcon fontSize="large" /> },
  { month: "May", focus: "Plyo", color: "#FFD54F", icon: <BoltIcon fontSize="large" /> },
  { month: "June", focus: "Recovery", color: "#81C784", icon: <SelfImprovementIcon fontSize="large" /> },
  { month: "July", focus: "Strength/Recovery", color: "#E57373", icon: <FitnessCenterIcon fontSize="large" /> },
  { month: "August", focus: "Plyo", color: "#FFD54F", icon: <BoltIcon fontSize="large" /> },
  { month: "September", focus: "Plyo", color: "#81C784", icon: <SelfImprovementIcon fontSize="large" /> },
  { month: "October", focus: "Strength", color: "#E57373", icon: <FitnessCenterIcon fontSize="large" /> },
  { month: "November", focus: "Plyo", color: "#FFD54F", icon: <BoltIcon fontSize="large" /> },
  { month: "December", focus: "Recovery", color: "#81C784", icon: <SelfImprovementIcon fontSize="large" /> },
];

const weeklyGoals = [
  "✔️ Improve hip mobility",
  "✔️ Stretching after every workout",
  "✔️ 2 core stability sessions",
];

export default function Dashboard() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        🏋️ Dashboard
      </Typography>

      {/* Monthly Focus */}
      <Typography variant="h6" gutterBottom>
        📅 Monthly Focus
      </Typography>
      <Grid container spacing={2}>
        {monthlyFocus.map((item) => (
          <Grid item xs={12} sm={4} key={item.month}>
            <Card
              sx={{
                backgroundColor: item.color,
                color: "#000",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {item.icon}
                  <Box>
                    <Typography variant="h6">{item.month}</Typography>
                    <Typography>{item.focus}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

{/* Weekly Focus - TABLE VERSION */}
<Typography variant="h6" gutterBottom sx={{ marginTop: 5 }}>
  🗓️ Weekly Schedule (Match Day Structure)
</Typography>

<TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
  <Table sx={{ tableLayout: "fixed", minWidth: 700 }}>
    <TableHead>
      <TableRow>
        {weeklyFocus.map((day, index) => {
          const modernColors = [
            "#E3F2FD", // light blue
          
          ];
          const cellColor = modernColors[index % modernColors.length];

          return (
            <TableCell
              key={day.label}
              align="center"
              sx={{
                backgroundColor: cellColor,
                fontWeight: "bold",
                color: "#000",
                fontSize: "1rem",
                width: `${100 / weeklyFocus.length}%`
              }}
            >
              {day.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        {weeklyFocus.map((day, index) => (
          <TableCell
            key={index}
            align="center"
            sx={{
              color: "#000",
              width: `${100 / weeklyFocus.length}%`,
              padding: 2,
              backgroundColor: "#fff" // no background color
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              {day.icon}
              <Typography variant="body2" fontWeight="bold">
                {day.focus}
              </Typography>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

      {/* Weekly Goals */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 5 }}>
        🎯 Weekly Goals
      </Typography>
      <Grid container spacing={2}>
        {weeklyGoals.map((goal, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "#e3f2fd" }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <CheckCircleIcon color="success" />
                  <Typography variant="body1">{goal}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Banner Sponsor alla fine */}
      <SponsorBanner />
    </Box>
  );
}
