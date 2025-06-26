import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const RPE = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [rpe, setRPE] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [message, setMessage] = useState('');

  // Fetch all player names from 'Players' table
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('Players').select('Name');
      if (error) {
        console.error('Error fetching players:', error);
      } else {
        setPlayers(data.map(player => player.Name));
      }
    };
    fetchPlayers();
  }, []);

  // Helper to get date daysAgo from a base date
  const daysAgo = (baseDate, days) => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() - days);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  // Calculate weekly load and ACWR
  const calculateWeeklyLoadAndACWR = async (playerName, todayLoad, todayDate) => {
    // Fetch all workloads for player ordered by date descending
    const { data, error } = await supabase
      .from('workloads')
      .select('daily_load, date')
      .eq('name', playerName)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching workloads:', error);
      return { weeklyLoad: todayLoad, acwr: null };
    }

    const parsedToday = new Date(todayDate);
    parsedToday.setHours(0, 0, 0, 0);

    // Filtra dati in range [startDayAgo ... endDayAgo]
    // startDayAgo >= endDayAgo, es: (6,0) -> ultimi 7 giorni compreso oggi
    const filterByRange = (startDayAgo, endDayAgo) =>
      data.filter(d => {
        const entryDate = new Date(d.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate >= daysAgo(parsedToday, startDayAgo) && entryDate <= daysAgo(parsedToday, endDayAgo);
      });

    // Acute load = somma daily_load negli ultimi 7 giorni compreso oggi
    const acutePeriod = filterByRange(6, 0);
    // Verifica se nei dati c'è un record per oggi
    const hasTodayEntry = acutePeriod.some(d => {
      const entryDate = new Date(d.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === parsedToday.getTime();
    });

    // Somma carico acute senza doppiare il giorno odierno
    let acuteLoad = acutePeriod.reduce((sum, d) => sum + d.daily_load, 0);
    // Se NON c'è il carico odierno nel DB, aggiungilo manualmente
    if (!hasTodayEntry) {
      acuteLoad += todayLoad;
    }

    // Chronic load = media dei carichi delle 4 settimane precedenti (7-34 giorni fa)
    const week1 = filterByRange(13, 7);
    const week2 = filterByRange(20, 14);
    const week3 = filterByRange(27, 21);
    const week4 = filterByRange(34, 28);

    const chronicSum = [week1, week2, week3, week4]
      .map(week => week.reduce((sum, d) => sum + d.daily_load, 0))
      .reduce((a, b) => a + b, 0);

    const chronicLoad = chronicSum / 4;

    const ACWR = chronicLoad > 0 ? (acuteLoad / chronicLoad).toFixed(2) : null;

    return { weeklyLoad: acuteLoad, ACWR };
  };

  // Save workload data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlayer || !rpe || !duration || !date) {
      setMessage('Please fill in all fields.');
      return;
    }

    const dailyLoad = parseInt(duration) * parseInt(rpe);

    // Check if entry already exists for this player and date
    const { data: existingData, error: fetchError } = await supabase
      .from('workloads')
      .select('*')
      .eq('name', selectedPlayer)
      .eq('date', date);

    if (fetchError) {
      console.error('Error checking existing entry:', fetchError);
      setMessage('Error checking for existing entry.');
      return;
    }

    if (existingData.length > 0) {
      setMessage('Entry for this player already exists for the selected date.');
      return;
    }

    // Calculate weekly load and ACWR includendo dati esistenti + carico odierno
    const { weeklyLoad, ACWR } = await calculateWeeklyLoadAndACWR(selectedPlayer, dailyLoad, date);

    // Inserisci dati nella tabella workloads
    const { error } = await supabase.from('workloads').insert([
      {
        name: selectedPlayer,
        date: date,
        duration: parseInt(duration),
        daily_load: dailyLoad,
        weekly_load: weeklyLoad,
        ACWR: ACWR,
        rpe: parseInt(rpe),
      },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
      setMessage('Error saving data.');
    } else {
      setMessage('Workload successfully saved!');
      // reset form
      setSelectedPlayer('');
      setRPE(null);
      setDuration('');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Player RPE & Workload Entry</h2>
      <form onSubmit={handleSubmit}>
        {/* Player Selection */}
        <div style={{ marginBottom: 10 }}>
          <label>Player:</label><br />
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            required
          >
            <option value="">-- Select Player --</option>
            {players.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div style={{ marginBottom: 10 }}>
          <label>Date:</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Duration Input */}
        <div style={{ marginBottom: 10 }}>
          <label>Duration (minutes):</label><br />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            min="1"
          />
        </div>

        {/* RPE Selection */}
        <div style={{ marginBottom: 10 }}>
          <label>RPE (Borg Scale 1–10):</label><br />
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {[...Array(10)].map((_, i) => {
              const level = i + 1;
              const color = `hsl(${240 - level * 20}, 70%, 60%)`;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setRPE(level)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: color,
                    border: rpe === level ? '3px solid black' : '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        <button type="submit" style={{ marginTop: 15 }}>Save Workload</button>
      </form>

      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
};

export default RPE;
