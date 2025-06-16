import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efzgpbneonewotqxozau.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmemdwYm5lb25ld290cXhvemF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTc5NDIsImV4cCI6MjA2MzY5Mzk0Mn0.nTGx7dLuieQqA_AKhlTncUtCPWA2I0tWq1qAJEmu8sg';
const supabase = createClient(supabaseUrl, supabaseKey);

const RPE = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rpe, setRpe] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const { data, error } = await supabase.from('Players').select('Name');
    if (error) {
      console.error('Errore nel recupero giocatori:', error);
    } else {
      setPlayers(data.map(player => player.Name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlayer || !rpe || !duration || !date) return;

    const daily_load = rpe * parseFloat(duration);
    setLoading(true);

    const { error } = await supabase.from('workloads').insert([
      {
        name: selectedPlayer,
        RPE: rpe,
        daily_load: daily_load,
        date: date,
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Errore durante il salvataggio: ' + error.message);
    } else {
      alert('Data saved successfully!');
      setSelectedPlayer('');
      setRpe(null);
      setDuration('');
      setDate('');
    }
  };

  const getColor = (value) => {
    if (value <= 3) return '#00cc66'; // verde
    if (value <= 6) return '#ffcc00'; // giallo
    return '#ff3300'; // rosso
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Inserisci il tuo RPE</h2>

      <label>Giocatore:</label><br />
      <select value={selectedPlayer} onChange={e => setSelectedPlayer(e.target.value)} required>
        <option value=''>-- Seleziona --</option>
        {players.map((name, i) => (
          <option key={i} value={name}>{name}</option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        <label>Scala di Borg (RPE):</label><br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[...Array(10)].map((_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRpe(value)}
                style={{
                  backgroundColor: getColor(value),
                  border: rpe === value ? '2px solid black' : '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '10px',
                  width: '30px',
                  cursor: 'pointer'
                }}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Durata (minuti):</label><br />
        <input
          type='number'
          value={duration}
          onChange={e => setDuration(e.target.value)}
          min='1'
          required
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Data:</label><br />
        <input
          type='date'
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
      </div>

      <button type='submit' disabled={loading} style={{ marginTop: '20px' }}>
        {loading ? 'Salvataggio in corso...' : 'Invia'}
      </button>
    </form>
  );
};

export default RPE;
