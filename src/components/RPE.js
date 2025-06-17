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

  // Compute weekly load and ACWR
  const calculateWeeklyLoadAndACWR = async (playerName, todayLoad, todayDate) => {
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
    const daysAgo = (d) => new Date(parsedToday.getTime() - d * 24 * 60 * 60 * 1000);
    const filterByRange = (startDay, endDay) =>
      data.filter(d => {
        const date = new Date(d.date);
        return date >= daysAgo(startDay) && date <= daysAgo(endDay);
      });

    // Acute Load = sum of the last 7 days including today
    const week0 = filterByRange(6, 0);
    const acuteLoad = week0.reduce((sum, d) => sum + d.daily_load, 0) + todayLoad;

    // Chronic Load = average of 4 previous weeks (7-34 days ago)
    const week1 = filterByRange(13, 7);
    const week2 = filterByRange(20, 14);
    const week3 = filterByRange(27, 21);
    const week4 = filterByRange(34, 28);

    const chronicLoad = ([week1, week2, week3, week4]
      .map(week => week.reduce((sum, d) => sum + d.daily_load, 0))
      .reduce((a, b) => a + b, 0)) / 4;

    const acwr = chronicLoad > 0 ? (acuteLoad / chronicLoad).toFixed(2) : null;

    return { weeklyLoad: acuteLoad, acwr };
  };

  // Save workload data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlayer || !rpe || !duration || !date) {
      setMessage('Please fill in all fields.');
      return;
    }

    const dailyLoad = parseInt(duration) * parseInt(rpe);

    // Check if entry already exists
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

    const { weeklyLoad, acwr } = await calculateWeeklyLoadAndACWR(selectedPlayer, dailyLoad, date);

    const { error } = await supabase.from('workloads').insert([
      {
        name: selectedPlayer,
        date: date,
        duration: parseInt(duration),
        daily_load: dailyLoad,
        weekly_load: weeklyLoad,
        acwr: acwr,
      },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
      setMessage('Error saving data.');
    } else {
      setMessage('Workload successfully saved!');
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

        {/* RPE Selection with Color Gradient */}
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
