import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const RPE = () => {
  const [playerName, setPlayerName] = useState('');
  const [dailyLoad, setDailyLoad] = useState('');
  const [message, setMessage] = useState('');

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

    const filterByRange = (startDay, endDay) => {
      return data.filter(d => {
        const date = new Date(d.date);
        return date >= daysAgo(startDay) && date <= daysAgo(endDay);
      });
    };

    // Acute load: last 7 days including today
    const week0 = filterByRange(6, 0);
    const acuteLoad = week0.reduce((sum, d) => sum + d.daily_load, 0) + todayLoad;

    // Chronic load: 4 previous weeks (not including current)
    const week1 = filterByRange(13, 7);
    const week2 = filterByRange(20, 14);
    const week3 = filterByRange(27, 21);
    const week4 = filterByRange(34, 28);

    const chronicLoad = ([week1, week2, week3, week4]
      .map(week => week.reduce((sum, d) => sum + d.daily_load, 0))
      .reduce((a, b) => a + b, 0)) / 4;

    const acwr = acuteLoad > 0 ? (chronicLoad / acuteLoad).toFixed(2) : null;

    return { weeklyLoad: acuteLoad, acwr };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!playerName || !dailyLoad) {
      setMessage('Please enter both player name and daily load.');
      return;
    }

    const todayDate = new Date().toISOString().split('T')[0];

    const { data: existingData, error: fetchError } = await supabase
      .from('workloads')
      .select('*')
      .eq('name', playerName)
      .eq('date', todayDate);

    if (fetchError) {
      console.error('Error checking existing entry:', fetchError);
      setMessage('Error checking for existing entry.');
      return;
    }

    if (existingData.length > 0) {
      setMessage('Data for this player already exists for today.');
      return;
    }

    const { weeklyLoad, acwr } = await calculateWeeklyLoadAndACWR(playerName, parseInt(dailyLoad), todayDate);

    const { error } = await supabase.from('workloads').insert([
      {
        name: playerName,
        daily_load: parseInt(dailyLoad),
        date: todayDate,
        weekly_load: weeklyLoad,
        acwr: acwr,
      },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
      setMessage('Error saving data.');
    } else {
      setMessage('Workload successfully saved!');
      setPlayerName('');
      setDailyLoad('');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h2>Player Workload Entry</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Player Name:</label><br />
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Daily Load:</label><br />
          <input
            type="number"
            value={dailyLoad}
            onChange={(e) => setDailyLoad(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Workload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RPE;
