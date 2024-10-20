import React, { useState, useEffect } from 'react';

function ReactionTimeModal({ onClose }) {
    const [isPreparing, setIsPreparing] = useState(true);
    const [reactionTime, setReactionTime] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect if the user is on a mobile device
        setIsMobile(window.innerWidth <= 768);

        const prepareTimeout = setTimeout(() => {
            setIsPreparing(false);
            setStartTime(Date.now());
        }, Math.random() * 3000 + 2000); // Random delay between 2-5 seconds for preparation

        const handleKeyDown = (e) => {
            if (e.code === 'Space' && !isPreparing) {
                setReactionTime(Date.now() - startTime);
            } else if (isPreparing) {
                setErrorMessage('Wait for the light to turn green!');
            }
        };

        // Add event listener for spacebar press
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(prepareTimeout);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPreparing, startTime]);

    const handleMobilePress = () => {
        if (!isPreparing) {
            setReactionTime(Date.now() - startTime);
        } else {
            setErrorMessage('Wait for the light to turn green!');
        }
    };

    return (
        <div className="modal">
            <h2>Test Your Reaction Time!</h2>
            {reactionTime === null ? (
                <>
                    <p>{isPreparing ? 'Prepare...' : 'GO!'}</p>
                    <div className="reaction-circle" />
                    {isMobile && (
                        <button className="mobile-button" onClick={handleMobilePress}>
                            PUSH
                        </button>
                    )}
                    <p className="error-message">{errorMessage}</p>
                    <button className="close-button" onClick={onClose}>
                        CLOSE
                    </button>
                </>
            ) : (
                <>
                    <p>Your Reaction Time: {reactionTime} ms</p>
                    <button className="close-button" onClick={onClose}>
                        CLOSE
                    </button>
                </>
            )}
        </div>
    );
}

export default ReactionTimeModal;
