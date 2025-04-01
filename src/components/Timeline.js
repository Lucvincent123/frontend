import React, { useState } from 'react';
import '../styles/Timeline.css';

const Timeline = () => {
    const eventList = [
        { id: 1, text: '1789 - Révolution Française', year: 1789 },
        { id: 2, text: '1914 - Début Première Guerre Mondiale', year: 1914 },
        { id: 3, text: '1945 - Fin Seconde Guerre Mondiale', year: 1945 },
        { id: 4, text: '1969 - Premier pas sur la Lune', year: 1969 }
    ];

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const shuffledEvents = shuffleArray([...eventList]);
    const initialEvent = shuffledEvents.shift();
    initialEvent.fixed = true;
    initialEvent.position = 200;

    const [events, setEvents] = useState([initialEvent]);
    const [eventQueue] = useState(shuffledEvents);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [droppedPosition, setDroppedPosition] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const proposedEvent = eventQueue[currentEventIndex] || null;

    const handleDrop = (e) => {
        e.preventDefault();
        if (!proposedEvent) return;

        const newPosition = e.clientX - e.currentTarget.offsetLeft;
        setDroppedPosition(newPosition);

        const sortedEvents = [...events, { ...proposedEvent, position: newPosition }].sort((a, b) => a.position - b.position);
        const index = sortedEvents.findIndex(e => e.id === proposedEvent.id);
        const leftEvent = sortedEvents[index - 1];
        const rightEvent = sortedEvents[index + 1];

        const isCorrectPosition = 
            (!leftEvent || leftEvent.year < proposedEvent.year) &&
            (!rightEvent || rightEvent.year > proposedEvent.year);

        setIsCorrect(isCorrectPosition);

        setTimeout(() => {
            if (isCorrectPosition) {
                setEvents([...sortedEvents]);
                setCurrentEventIndex(prev => prev + 1);
            }
            setIsCorrect(null);
            setDroppedPosition(null);
        }, 1000);
    };

    return (
        <div>
            <div id="timeline" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
                {events.map(event => (
                    <div
                        key={event.id}
                        className={`event ${event.fixed ? 'fixed-event' : ''}`}
                        style={{ left: `${event.position}px` }}
                    >
                      {event.text}
                    </div>
                ))}
                {droppedPosition !== null && (
                    <div
                        className={`event proposed-event ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                        style={{ left: `${droppedPosition}px` }}
                    >
                      {proposedEvent.text}
                    </div>
                  </div>
                    // <div
                    //     className={`event proposed-event ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                    //     style={{ left: `${proposedEvent.position}px` }}
                    // >
                    //     {proposedEvent.text}
                    // </div>
                )}
            </div>
            {proposedEvent && droppedPosition === null && (
                <div className="proposed-event-container" draggable>
                    <div className="event proposed-event">
                        {proposedEvent.text}
                    </div>
                </div>
                // <div
                //     className="proposed-event-container"
                //     draggable
                //     onDragStart={(e) => handleDragStart(e, proposedEvent.id)}
                // >
                //     <div className="event proposed-event">
                //         {proposedEvent.text}
                //     </div>
                // </div>
            )}
        </div>
    );
};

export default Timeline;