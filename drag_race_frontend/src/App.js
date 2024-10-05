import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [powerHp, setPowerHp] = useState('');
  const [weightLb, setWeightLb] = useState('');
  const [tireSizeInches, setTireSizeInches] = useState('');
  const [nitrousShot, setNitrousShot] = useState('');
  const [engineBuild, setEngineBuild] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/calculate', {
        power_hp: parseFloat(powerHp),
        weight_lb: parseFloat(weightLb),
        tire_size_inches: parseFloat(tireSizeInches),
        nitrous_shot: parseFloat(nitrousShot),
        engine_build: parseInt(engineBuild),
      });
      setResult(response.data.quarter_mile_time);
    } catch (error) {
      console.error('Error calculating quarter-mile time:', error);
    }
  };

  return (
    <div className="App">
      <h1>Isaac's Drag Race Performance Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Engine Power (HP):
          <input type="number" value={powerHp} onChange={(e) => setPowerHp(e.target.value)} required />
        </label>
        <label>
          Car Weight (LB):
          <input type="number" value={weightLb} onChange={(e) => setWeightLb(e.target.value)} required />
        </label>
        <label>
          Tire Size (Inches):
          <input type="number" value={tireSizeInches} onChange={(e) => setTireSizeInches(e.target.value)} required />
        </label>
        <label>
          Nitrous Shot (HP):
          <input type="number" value={nitrousShot} onChange={(e) => setNitrousShot(e.target.value)} required />
        </label>
        <label>
          Engine Build:
          <select value={engineBuild} onChange={(e) => setEngineBuild(e.target.value)} required>
            <option value="">Select...</option>
            <option value="1">Stock</option>
            <option value="2">Mildly Built</option>
            <option value="3">Fully Built</option>
          </select>
        </label>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h2>Estimated Quarter-Mile Time: {result} seconds</h2>
        </div>
      )}
    </div>
  );
}

export default App;
