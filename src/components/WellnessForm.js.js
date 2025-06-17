import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { supabase } from './supabaseClient'; // Assicurati che sia corretto

const WellnessForm = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [formData, setFormData] = useState({
    soreness_muscle: '',
    soreness_joint: '',
    sleep_hours: '',
    stress: '',
    food_and_drink: '',
  });
  const [date, setDate] = useState(dayjs());
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('Players').select('Name');
      if (!error) setPlayers(data);
      else console.error('Errore nel caricamento giocatori:', error);
    };

    fetchPlayers();
  }, []);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlayer || !date) return;

    const { data, error } = await supabase.from('MonitoringData').insert([
      {
        name: selectedPlayer,
        date: date.format('YYYY-MM-DD'),
        ...formData,
      },
    ]);

    if (!error) {
      setSnackbarOpen(true);
      setFormData({
        soreness_muscle: '',
        soreness_joint: '',
        sleep_hours: '',
        stress: '',
        food_and_drink: '',
      });
      setSelectedPlayer('');
      setDate(dayjs());
    } else {
      console.error('Errore nel salvataggio:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          maxWidth: 500,
          margin: 'auto',
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: '#fff',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Inserimento Wellness Giornaliero
        </Typography>

        <form onSubmit={handleSubmit}>
          <Select
            fullWidth
            displayEmpty
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Seleziona Giocatore
            </MenuItem>
            {players.map((p) => (
              <MenuItem key={p.Name} value={p.Name}>
                {p.Name}
              </MenuItem>
            ))}
          </Select>

          <DatePicker
            label="Data"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            sx={{ mb: 2, width: '100%' }}
          />

          <TextField
            label="Dolore Muscolare"
            fullWidth
            type="number"
            value={formData.soreness_muscle}
            onChange={handleChange('soreness_muscle')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Dolore Articolare"
            fullWidth
            type="number"
            value={formData.soreness_joint}
            onChange={handleChange('soreness_joint')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Ore di Sonno"
            fullWidth
            type="number"
            value={formData.sleep_hours}
            onChange={handleChange('sleep_hours')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Stress"
            fullWidth
            type="number"
            value={formData.stress}
            onChange={handleChange('stress')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Alimentazione / Idratazione"
            fullWidth
            type="number"
            value={formData.food_and_drink}
            onChange={handleChange('food_and_drink')}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Salva Dati
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            Dati salvati con successo!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default WellnessForm;
