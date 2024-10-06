import React, { useState } from 'react';
import './App.css';
import ReactionTimeModal from './components/ReactionTimeModal';

function App() {
  const [power, setPower] = useState('');
  const [weight, setWeight] = useState('');
  const [tireSize, setTireSize] = useState('');
  const [nitrous, setNitrous] = useState('');
  const [engineBuild, setEngineBuild] = useState(''); // Default to 'Choose'
  const [performanceResult, setPerformanceResult] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle recording of reaction time
  const handleReactionRecorded = (time) => {
    setReactionTime(time);
  };

  // Function to handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle form submission and calculate performance
  const handleSubmit = (e) => {
    e.preventDefault();

    if (power && weight) {
      // Calculate effective power based on engine build type
      let effectivePower = parseFloat(power) + parseFloat(nitrous || 0);
      if (engineBuild === '1') {
        // Stock: Subtract 5%
        effectivePower *= 0.95;
      } else if (engineBuild === '2') {
        // Mildly Built: No adjustment
        effectivePower = effectivePower;
      } else if (engineBuild === '3') {
        // Fully Built: Add 5%
        effectivePower *= 1.05;
      }

      // Simple calculation for drag race performance (example formula)
      const quarterMileTime = ((parseFloat(weight) / effectivePower) ** 0.333) * 5.825;
      setPerformanceResult(quarterMileTime.toFixed(2));
    }
  };

  return (
    <div className="App">
      <h1>Isaac's Drag Race Performance Calculator</h1>

      {/* Existing form for drag race calculations */}
      <div className="calculator-form">
        <form onSubmit={handleSubmit}>
          <label>
            Engine Power (HP):
            <input
              type="number"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              required
            />
          </label>
          <label>
            Car Weight (LB):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </label>
          <label>
            Tire Size (Inches):
            <input
              type="number"
              value={tireSize}
              onChange={(e) => setTireSize(e.target.value)}
            />
          </label>
          <label>
            Nitrous Shot (HP):
            <input
              type="number"
              value={nitrous}
              onChange={(e) => setNitrous(e.target.value)}
            />
          </label>
          <label>
            Engine Build:
            <select value={engineBuild} onChange={(e) => setEngineBuild(e.target.value)} required>
              <option value="" disabled>
                Choose
              </option>
              <option value="1">Stock</option>
              <option value="2">Mildly Built</option>
              <option value="3">Fully Built</option>
            </select>
          </label>
          <button type="submit">Calculate Performance</button>
        </form>
      </div>

      {/* Display performance result */}
      {performanceResult && (
        <div className="performance-result">
          <h2>Estimated Quarter-Mile Time: {performanceResult} seconds</h2>
        </div>
      )}

      {/* Display reaction time on main calculator */}
      {reactionTime && (
        <div className="main-reaction-time-display">
          Last Recorded Reaction Time: {reactionTime} seconds
        </div>
      )}

      {/* Button to open Reaction Time Modal */}
      <button onClick={openModal}>Test Your Reaction Time</button>

      {/* Include Reaction Time Modal */}
      {isModalOpen && (
        <ReactionTimeModal
          onReactionRecorded={handleReactionRecorded}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;


