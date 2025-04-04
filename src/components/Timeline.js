import React, { useState, useEffect } from 'react';
import '../styles/Timeline.css';

const Timeline = () => {
    const [events, setEvents] = useState([]);
    const [eventQueue, setEventQueue] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [droppedPosition, setDroppedPosition] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);


    useEffect(() => {
        fetch('http://localhost:5000/api/events')
            .then(response => response.json())
            .then(data => {
                console.log("Données récupérées:", data);

                if (data.length === 0) {
                    console.warn("Aucun événement récupéré !");
                    return;
                }

                const shuffledEvents = [...data].sort(() => Math.random() - 0.5);
                const initialEvent = shuffledEvents.shift();

                if (!initialEvent) return;

                initialEvent.fixed = true;
                initialEvent.position = 500;
                initialEvent.className = "above";

                setEvents([initialEvent]);
                setEventQueue(shuffledEvents);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des événements :', error);
            });
    }, []);

    const proposedEvent = eventQueue[currentEventIndex] || null;

    const handleDrop = (e) => {
        e.preventDefault();
        if (!proposedEvent) return;

        const newPosition = e.clientX;
        setDroppedPosition(newPosition);

        const sortedEvents = [...events, { ...proposedEvent, position: newPosition }].sort((a, b) => a.position - b.position);

        const index = sortedEvents.findIndex(e => e.ID === proposedEvent.ID);
        const leftEvent = sortedEvents[index - 1];
        const rightEvent = sortedEvents[index + 1];

        const isCorrectPosition =
            (!leftEvent || leftEvent.Année <= proposedEvent.Année) &&
            (!rightEvent || rightEvent.Année >= proposedEvent.Année);

        setIsCorrect(isCorrectPosition);

        setTimeout(() => {
            if (isCorrectPosition) {
                const updatedEvents = sortedEvents.map((event, i) => ({
                    ...event,
                    className: i % 2 === 0 ? 'above' : 'below'
                }));
                setEvents(updatedEvents);
                setCurrentEventIndex(prev => prev + 1);
            }
            setIsCorrect(null);
            setDroppedPosition(null);
        }, 1000);
    };
    
    return (
        <div className="timeline-container">
            <div id="timeline" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                {events.map(event => (
                    <div
                        key={event.ID}
                        className={`event ${event.fixed ? 'fixed-event' : ''} ${event.className}`}
                        style={{
                            left: `${event.position}px`,
                            backgroundImage: `url(${event.Image})`
                        }}
                    >
                        {event.Événement}
                        {/* Trait vertical reliant à la frise */}
                        <div className="event-connector"></div>
                        
                        {/* Point d'ancrage sur la frise */}
                        <div className="event-dot"></div>
                    </div>
                ))}
                {droppedPosition !== null && (
                    <div
                        className={`event proposed-event ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                        style={{
                            left: `${droppedPosition}px`,
                            backgroundImage: `url(${proposedEvent.Image})`
                        }}
                    >
                        {proposedEvent.Événement}
                    </div>
                )}
            </div>
            {proposedEvent && droppedPosition === null && (
                <div className="proposed-event-container" draggable>
                    <div className="event proposed-event" style={{ backgroundImage: `url(${proposedEvent.Image})` }}>
                        {proposedEvent.Événement}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timeline;
