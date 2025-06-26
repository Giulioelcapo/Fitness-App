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
import { supabase } from '../supabaseClient'; // Controlla il path

const WellnessForm = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [formData, setFormData] = useState({
    soreness_load: '',
    soreness_joint: '',
    sleep_hours: '',
    stress: '',
    food_and_drink: '',
  });
  const [date, setDate] = useState(dayjs());
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Carica la lista dei giocatori da Supabase
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('Players').select('Name');
      if (error) {
        console.error('Errore nel caricamento giocatori:', error);
        alert('Errore nel caricamento giocatori');
      } else {
        setPlayers(data);
      }
    };
    fetchPlayers();
  }, []);

  // Gestione cambio input
  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validazione base
    if (!selectedPlayer) {
      alert('Seleziona un giocatore');
      return;
    }
    if (!date || !dayjs.isDayjs(date) || !date.isValid()) {
      alert('Seleziona una data valida');
      return;
    }

    // Inserimento dati su Supabase
    const { data, error } = await supabase.from('MonitoringData').insert([
      {
        name: selectedPlayer,
        date: date.format('YYYY-MM-DD'),
        soreness_muscle: formData.soreness_load,
        soreness_joint: formData.soreness_joint,
        sleep_hours: formData.sleep_hours,
        stress: formData.stress,
        food_and_drink: formData.food_and_drink,
      },
    ]);

    console.log('Risultato insert:', data, error);

    if (error) {
      alert('Errore nel salvataggio: ' + error.message);
    } else {
      setSnackbarOpen(true);
      // Reset form
      setFormData({
        soreness_muscle: '',
        soreness_joint: '',
        sleep_hours: '',
        stress: '',
        food_and_drink: '',
      });
      setSelectedPlayer('');
      setDate(dayjs());
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
          Daily Wellness Entry
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
              Select Player
            </MenuItem>
            {players.map((p) => (
              <MenuItem key={p.Name} value={p.Name}>
                {p.Name}
              </MenuItem>
            ))}
          </Select>

          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => {
              if (newValue === null) {
                setDate(dayjs());
              } else {
                setDate(newValue);
              }
            }}
            sx={{ mb: 2, width: '100%' }}
          />

          <TextField
            label="Muscle Soreness Load"
            fullWidth
            type="number"
            value={formData.soreness_muscle}
            onChange={handleChange('soreness_load')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Joint Soreness"
            fullWidth
            type="number"
            value={formData.soreness_joint}
            onChange={handleChange('soreness_joint')}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Sleep Hours"
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
            label="Food and Drink"
            fullWidth
            type="number"
            value={formData.food_and_drink}
            onChange={handleChange('food_and_drink')}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" color="primary" fullWidth type="submit">
            Save Data
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Saved successfully!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default WellnessForm;
