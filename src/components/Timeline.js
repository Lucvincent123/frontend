import React, { useState } from 'react';
import '../styles/Timeline.css'; // Assurez-vous d'importer le fichier CSS

const Timeline = () => {
    const [events, setEvents] = useState([
        { id: 1, text: '1789 - Révolution Française', position: 100, fixed: true },
    ]);

    const [proposedEvent, setProposedEvent] = useState({
        id: 2,
        text: '1914 - Début Première Guerre Mondiale',
        position: null,
        fixed: false,
    });

    const [isCorrect, setIsCorrect] = useState(null);

    const handleDragStart = (event, id) => {
        if (!events.find(e => e.id === id)?.fixed) {
            event.dataTransfer.setData('eventId', id);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        const eventId = e.dataTransfer.getData('eventId');
        const newPosition = e.clientX - e.currentTarget.offsetLeft - 50;

        if (eventId === '2') {
            setProposedEvent(prev => ({
                ...prev,
                position: newPosition,
            }));

            // Logique pour vérifier si le placement est correct
            const correctPosition = newPosition > 100; // Exemple simple
            setIsCorrect(correctPosition);

            // Réinitialiser après un court délai pour permettre l'animation
            setTimeout(() => {
                setIsCorrect(null);
                if (correctPosition) {
                    setEvents(prev => [...prev, { ...proposedEvent, position: newPosition, fixed: true }]);
                    setProposedEvent(null);
                }
            }, 1000);
        }
    };

    return (
        <div>
            <div id="timeline" onDragOver={handleDragOver} onDrop={handleDrop}>
                {events.map(event => (
                    <div
                        key={event.id}
                        className={`event ${event.fixed ? 'fixed-event' : ''}`}
                        style={{ left: `${event.position}px` }}
                        draggable={!event.fixed}
                        onDragStart={(e) => handleDragStart(e, event.id)}
                    >
                        {event.text}
                    </div>
                ))}
                {proposedEvent && proposedEvent.position !== null && (
                    <div
                        className={`event proposed-event ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                        style={{ left: `${proposedEvent.position}px` }}
                    >
                        {proposedEvent.text}
                    </div>
                )}
            </div>
            {proposedEvent && proposedEvent.position === null && (
                <div
                    className="proposed-event-container"
                    draggable
                    onDragStart={(e) => handleDragStart(e, proposedEvent.id)}
                >
                    <div className="event proposed-event">
                        {proposedEvent.text}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;
