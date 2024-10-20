import React, { useState, useEffect } from 'react';

const ReactionTimeModal = ({ onClose }) => {
  const [status, setStatus] = useState('Prepare...');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [waitingForGreen, setWaitingForGreen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus('Go!');
      setStartTime(new Date().getTime());
      setWaitingForGreen(true);
    }, Math.random() * 3000 + 2000); // Random delay between 2-5 seconds

    return () => clearTimeout(timeout);
  }, []);

  const handleKeyDown = (event) => {
    if (waitingForGreen && event.key === ' ') {
      const endTime = new Date().getTime();
      setReactionTime(endTime - startTime);
      setStatus(`Your Reaction Time: ${endTime - startTime} ms`);
      setWaitingForGreen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [waitingForGreen, startTime]);

  return (
    <div className="reaction-time-modal">
      <div className="modal-content">
        <h2>Test Your Reaction Time!</h2>
        <p>{status}</p>
        {reactionTime === null && <div className="light red" />}
        {reactionTime !== null && <div className="light green" />}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReactionTimeModal;
