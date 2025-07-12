import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { supabase } from "../supabaseClient";
import SponsorBanner from "../components/SponsorBanner";

const weeklyFocus = [
  { label: "MD+1", focus: "Mobility", color: "#B2EBF2" },
  { label: "MD+2", focus: "Strength & Plyo", color: "#FFF9C4" },
  { label: "MD+3", focus: "Strength", color: "#FFCDD2" },
  { label: "MD-3", focus: "Power", color: "#C8E6C9" },
  { label: "MD-2", focus: "Speed", color: "#D1C4E9" },
  { label: "MD-1", focus: "Light Prep", color: "#FFF8E1" },
  { label: "MD", focus: "Match", color: "#CFD8DC" },
];

const weeklyGoals = [
  "Improve hip mobility",
  "Stretch after every workout",
  "2 core stability sessions",
];

export default function Dashboard() {
  const [upcomingSession, setUpcomingSession] = useState(null);
  const [monthlyFocus, setMonthlyFocus] = useState(null);
  const [weeklyScheduleData, setWeeklyScheduleData] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingMonthlyFocus, setLoadingMonthlyFocus] = useState(true);
  const [loadingWeeklySchedule, setLoadingWeeklySchedule] = useState(true);
  const columnsToShow = [
    "Pre-Activation",
    "MD",
    "MD+1",
    "MD+2",
    "MD+3",
    "MD-3",
    "MD-2",
    "MD-1",
    "MD",
  ];

  const currentMonthName = new Date().toLocaleString("en-US", { month: "long" });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchUpcomingSession = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gt("date", today)
        .order("date", { ascending: true })
        .limit(1)
        .single();

      if (!error) setUpcomingSession(data);
      setLoadingSession(false);
    };

    const fetchMonthlyFocus = async () => {
      const { data, error } = await supabase
        .from("monthly Focus")
        .select("*")
        .limit(1)
        .single();

      if (!error) {
        const focusForCurrentMonth = data ? data[currentMonthName] : null;
        setMonthlyFocus(focusForCurrentMonth);
      }
      setLoadingMonthlyFocus(false);
    };

    const fetchWeeklySchedule = async () => {
      const { data, error } = await supabase.from("weekly_schedule").select("*");
      if (!error) setWeeklyScheduleData(data || []);
      setLoadingWeeklySchedule(false);
    };

    fetchUpcomingSession();
    fetchMonthlyFocus();
    fetchWeeklySchedule();
  }, [currentMonthName]);

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      {/* Header */}
      <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
        Dashboard
      </Typography>

      {/* Upcoming Session */}
      <Typography variant="h6" gutterBottom>
        Upcoming Session
      </Typography>
      <Card
        sx={{
          backgroundColor: upcomingSession?.color || "#E0E0E0",
          borderRadius: 2,
          boxShadow: 3,
          mb: 4,
        }}
      >
        <CardContent>
          {loadingSession ? (
            <CircularProgress />
          ) : upcomingSession ? (
            <>
              <Typography variant="h6">{upcomingSession.title}</Typography>
              <Typography variant="body2">
                {new Date(upcomingSession.date).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <Typography>No upcoming session found.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Monthly Focus */}
      <Typography variant="h6" gutterBottom>
        Monthly Focus - {currentMonthName}
      </Typography>
      {loadingMonthlyFocus ? (
        <CircularProgress />
      ) : monthlyFocus ? (
        <Card sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, boxShadow: 3, mb: 4 }}>
          <CardContent>
            <Typography>{monthlyFocus}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>No focus set for this month.</Typography>
      )}

      {/* Weekly Schedule */}
      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        Weekly Schedule
      </Typography>

      {loadingWeeklySchedule ? (
        <CircularProgress />
      ) : weeklyScheduleData.length === 0 ? (
        <Typography>No data found in Weekly Schedule.</Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, minWidth: 650 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columnsToShow.map((col) => (
                    <TableCell
                      key={col}
                      align={col === "Pre-Activation" ? "left" : "center"}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: col === "Pre-Activation" ? "#e0f7fa" : "#f5f5f5",
                        minWidth: 120,
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {weeklyScheduleData.map((row, idx) => (
                  <TableRow key={idx}>
                    {columnsToShow.map((col) => (
                      <TableCell
                        key={col}
                        align={col === "Pre-Activation" ? "left" : "center"}
                        sx={{
                          backgroundColor: col === "Pre-Activation" ? "#e0f7fa" : "inherit",
                          wordBreak: "break-word",
                        }}
                      >
                        {row[col]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Weekly Goals */}
      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        Weekly Goals
      </Typography>
      <Grid container spacing={2}>
        {weeklyGoals.map((goal, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: "#f0f4c3" }}>
              <CardContent>
                <Typography variant="body1">{goal}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sponsor Banner */}
      <Box sx={{ mt: 5 }}>
        <SponsorBanner />
      </Box>
    </Box>
  );
}

