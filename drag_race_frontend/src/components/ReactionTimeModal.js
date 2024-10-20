
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ReactionTimeModal.css';

const ReactionTimeModal = ({ onClose, onReactionRecorded }) => {
  const [countdown, setCountdown] = useState('Prepare...');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [isHoldingSpace, setIsHoldingSpace] = useState(false);
  const [lightColor, setLightColor] = useState('red');
  const [isReady, setIsReady] = useState(false); // Track readiness
  const [redlight, setRedlight] = useState(false); // Track if the user redlit
  const countdownIntervalRef = useRef(null); // Reference for the countdown interval
  const timeoutRef = useRef(null); // Reference for the green light timeout

  // Record reaction time
  const recordReaction = useCallback(() => {
    if (startTime && isReady) {
      const endTime = new Date().getTime();
      const reactionDuration = ((endTime - startTime) / 1000).toFixed(3);
      console.log(`Reaction time recorded: ${reactionDuration} seconds`);
      setReactionTime(reactionDuration);
      onReactionRecorded(reactionDuration); // Pass reaction time to the main calculator
      setStartTime(null);
      setLightColor('red');
      setCountdown('Prepare...');
      setIsReady(false);
    } else if (!isReady) {
      console.log('You redlit!');
      setRedlight(true);
      setCountdown('You redlit! Hold spacebar to try again.');
      setLightColor('red');
      clearInterval(countdownIntervalRef.current); // Stop the countdown if redlit
      clearTimeout(timeoutRef.current); // Stop any pending timeouts
    } else {
      console.log('Reaction not recorded because startTime is null.');
    }
  }, [startTime, isReady, onReactionRecorded]);

  // Handle key press events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space' && !isHoldingSpace) {
        console.log('Spacebar pressed down');
        setIsHoldingSpace(true);
        if (redlight) {
          // Reset redlight state and start countdown again
          setRedlight(false);
          startCountdown();
        } else {
          startCountdown(); // Start countdown on spacebar press
        }
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space' && isHoldingSpace) {
        console.log('Spacebar released');
        setIsHoldingSpace(false);
        recordReaction(); // Record reaction on spacebar release
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isHoldingSpace, redlight, recordReaction]);

  // Start countdown
  const startCountdown = () => {
    setCountdown('Get Ready...');
    setLightColor('yellow');
    setReactionTime(null);
    setIsReady(false);
    console.log('Countdown started, preparing...');
    let count = 3;

    countdownIntervalRef.current = setInterval(() => {
      if (count > 0) {
        console.log(`Countdown: ${count}`);
        setCountdown(count);
        count--;
      } else {
        clearInterval(countdownIntervalRef.current);
        initiateReactionTest();
      }
    }, 1000);
  };

  // Initiate the reaction test phase
  const initiateReactionTest = () => {
    console.log('Initiating reaction test...');
    setCountdown('Hold the spacebar...');
    setLightColor('yellow');

    // Set a 1-second delay before turning green
    timeoutRef.current = setTimeout(() => {
      setCountdown('GO!');
      setLightColor('green');
      const time = new Date().getTime();
      setStartTime(time);
      setIsReady(true);
      console.log('Timer started, startTime set:', time);
    }, 1000);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-content">
          <h2>Test Your Reaction Time!</h2>
          <div
            className="countdown-display"
            style={{
              color: countdown === 'GO!' ? '#00ff00' : '#ffcc00',
            }}
          >
            {countdown}
          </div>
          <div
            className="light-indicator"
            style={{
              backgroundColor: lightColor,
            }}
          ></div>
          <p>Press and hold the spacebar, then release when the light turns green!</p>
          {reactionTime && (
            <div className="reaction-time-result">
              Your Reaction Time: {reactionTime} seconds
            </div>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

