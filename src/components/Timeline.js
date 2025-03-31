import React, { useState } from 'react';
import '../styles/Timeline.css'; // Assurez-vous d'importer le fichier CSS

const Timeline = () => {
    const [events, setEvents] = useState([
        { id: 1, text: '1789 - Révolution Française', position: 100, fixed: true, image:'https://i.imgur.com/HO21ehl.png',annee: 1922 },
    ]);

    const [proposedEvent, setProposedEvent] = useState({
        id: 2,
        text: '1914 - Début Première Guerre Mondiale',
        position: null,
        fixed: false,
        image:'https://i.imgur.com/HO21ehl.png',
        annee: 1922
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
                {events.map((event) => (
                    <div
                    key={event.id}
                    className={`event ${event.fixed ? 'fixed-event' : ''}`}
                    draggable={!event.fixed}
                    onDragStart={(e) => handleDragStart(e, event.id)}
                    style={{
                      position: 'absolute',
                      left: event.position,   // A voir si ca correspond a ton style={{ left: `${event.position}px` }}
                    //   top: event.position.y,
                      width: '150px',
                      height: '190px',
                      cursor: 'grab',
                      zIndex: 2,
                      border: '3px solid black',
                      borderRadius: '10px',
                      backgroundColor: '#d4c19c',
                      display: 'flex',
                      flexDirection: 'column',
                      alignevents: 'center',
                      padding: '5px',
                      boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
                      fontFamily: 'Arial, sans-serif',
                      textAlign: 'center',
                      transition: 'transform 0.2s'
                    }}
                    
                  >
                    {/* Image */}
                    <div
                      style={{
                        width: '100%',
                        height: '60%',
                        borderBottom: '2px solid black',
                      }}
                    >
                      <img 
                        src={event.image} 
                        alt={`event ${event.id}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  
                    {/* Description */}
                    <div
                      style={{
                        width: '100%',
                        height: '40%',
                        backgroundColor: 'rgba(201, 204, 27, 0.67)',
                        padding: '0px',
                        fontSize: '13px',
                        overflow: 'hidden',
                      }}
                    >
                      {event.text}
                    </div>
                  </div>
                    // <div
                    //     key={event.id}
                    //     className={`event ${event.fixed ? 'fixed-event' : ''}`}
                    //     style={{ left: `${event.position}px` }}
                    //     draggable={!event.fixed}
                    //     onDragStart={(e) => handleDragStart(e, event.id)}
                    // >
                    //     {event.text}
                    // </div>
                ))}
                {proposedEvent && proposedEvent.position !== null && (
                    <div
                    // key={proposedEvent.id}
                    className={`event proposed-event ${isCorrect !== null ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                    // draggable={!proposedEvent.fixed}
                    // onDragStart={(e) => handleDragStart(e, proposedEvent.id)}
                    style={{
                      position: 'absolute',
                      left: proposedEvent.position,   // A voir si ca correspond a ton style={{ left: `${event.position}px` }}
                    //   top: event.position.y,
                      width: '150px',
                      height: '190px',
                      cursor: 'grab',
                      zIndex: 2,
                      border: '3px solid black',
                      borderRadius: '10px',
                      backgroundColor: '#d4c19c',
                      display: 'flex',
                      flexDirection: 'column',
                      alignevents: 'center',
                      padding: '5px',
                      boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
                      fontFamily: 'Arial, sans-serif',
                      textAlign: 'center',
                      transition: 'transform 0.2s'
                    }}
                    
                  >
                    {/* Image */}
                    <div
                      style={{
                        width: '90%',
                        height: '60%',
                        borderBottom: '2px solid black',
                      }}
                    >
                      <img 
                        src={proposedEvent.image} 
                        alt={`event ${proposedEvent.id}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  
                    {/* Description */}
                    <div
                      style={{
                        width: '100%',
                        height: '40%',
                        backgroundColor: 'rgba(201, 204, 27, 0.67)',
                        padding: '0px',
                        fontSize: '13px',
                        overflow: 'hidden',
                      }}
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
            {proposedEvent && proposedEvent.position === null && (

                <div
                // key={proposedEvent.id}
                className="proposed-event-container"
                draggable
                onDragStart={(e) => handleDragStart(e, proposedEvent.id)}
                // draggable={!proposedEvent.fixed}
                // onDragStart={(e) => handleDragStart(e, proposedEvent.id)}
                style={{
                position: 'absolute',
                left: proposedEvent.position,   // A voir si ca correspond a ton style={{ left: `${event.position}px` }}
                //   top: event.position.y,
                width: '150px',
                height: '190px',
                cursor: 'grab',
                zIndex: 2,
                border: '3px solid black',
                borderRadius: '10px',
                backgroundColor: '#d4c19c',
                display: 'flex',
                flexDirection: 'column',
                alignevents: 'center',
                padding: '5px',
                boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                transition: 'transform 0.2s'
                }}

                >
                {/* Image */}
                <div
                style={{
                    width: '90%',
                    height: '60%',
                    borderBottom: '2px solid black',
                }}
                >
                <img 
                    src={proposedEvent.image} 
                    alt={`event ${proposedEvent.id}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                </div>

                {/* Description */}
                <div
                style={{
                    width: '100%',
                    height: '40%',
                    backgroundColor: 'rgba(201, 204, 27, 0.67)',
                    padding: '0px',
                    fontSize: '13px',
                    overflow: 'hidden',
                }}
                >
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
