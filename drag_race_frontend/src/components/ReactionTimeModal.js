import React, { useState, useEffect } from 'react';

const ReactionTimeModal = ({ onClose }) => {
    const [status, setStatus] = useState('Prepare...');
    const [reactionTime, setReactionTime] = useState(null);
    const [waitingForGreen, setWaitingForGreen] = useState(false);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('GO!');
            setWaitingForGreen(true);
            setStartTime(Date.now());
        }, Math.random() * 3000 + 2000); // Random delay between 2 to 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleKeyDown = (e) => {
        if (waitingForGreen) {
            if (e.key === ' ') {
                const endTime = Date.now();
                setReactionTime(endTime - startTime);
                setStatus('Your reaction time is ' + (endTime - startTime) + 'ms');
                setWaitingForGreen(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [waitingForGreen, startTime]);

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Test Your Reaction Time!</h2>
                <p>{status}</p>
                <button onClick={onClose}>CLOSE</button>
            </div>
        </div>
    );
};

export default ReactionTimeModal;
