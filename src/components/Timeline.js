import React, { useState, useEffect } from 'react';
import '../styles/Timeline.css';
import { useLocation } from "react-router-dom";

const Timeline = () => {
    const [events, setEvents] = useState([]);
    const [eventQueue, setEventQueue] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [droppedPosition, setDroppedPosition] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [themeData, setThemeData] = useState({ name: '', image: '' });
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [isWin, setIsWin] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const action = params.get("action") || "10"; 

    const getMaxStreakForTheme = (theme) => {
        const savedStreaks = JSON.parse(localStorage.getItem("themeMaxStreaks") || "{}");
        return savedStreaks[theme] || 0;
    };

    const setMaxStreakForTheme = (theme, streak) => {
        const savedStreaks = JSON.parse(localStorage.getItem("themeMaxStreaks") || "{}");
        savedStreaks[theme] = streak;
        localStorage.setItem("themeMaxStreaks", JSON.stringify(savedStreaks));
    };

    // Chargement des données du thème
    useEffect(() => {
        fetch(`http://localhost:5000/api/categories`)
            .then(res => res.json())
            .then(data => {
                const theme = data.find(cat => cat.action.toString() === action);
                if (theme) {
                    setThemeData({ name: theme.text, image: theme.imageUrl });
                    setMaxStreak(getMaxStreakForTheme(theme.text));
                }
            })
            .catch(err => console.error("Erreur de chargement du thème :", err));
    }, [action]);

    // Chargement des événements
    useEffect(() => {
        const fetchData = (url, theme = "") => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (theme === "Random") {
                        data = data.filter(evenement =>
                            evenement.Catégories.includes("Science") ||
                            evenement.Catégories.includes("Histoire") ||
                            evenement.Catégories.includes("Sport")
                        );
                    } else if (theme !== "") {
                        data = data.filter(evenement => evenement.Catégories.includes(theme));
                    }

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
        };

        switch (action) {
            case "1":
                fetchData("http://localhost:5000/api/events", "Science");
                break;
            case "2":
                fetchData("http://localhost:5000/api/events", "Histoire");
                break;
            case "0":
                fetchData("http://localhost:5000/api/events", "Vietnam");
                break;
            case "3":
                fetchData("http://localhost:5000/api/events_insa");
                break;
            case "10":
                fetchData("http://localhost:5000/api/events", "Random");
                break;
            case "4":
                fetchData("http://localhost:5000/api/events", "Sport");
                break;
            case "5":
                fetchData("http://localhost:5000/api/events", "Contemporain");
                break;
            case "6":
                fetchData("http://localhost:5000/api/events", "Moyen-Âge");
                break;
            case "7":   
                fetchData("http://localhost:5000/api/events", "Antiquité");
                break;
            case "8":
                fetchData("http://localhost:5000/api/events", "Préhistoire");
                break;
            case "9":
                fetchData("http://localhost:5000/api/events", "Moderne");
                break;
            default:
                fetchData("http://localhost:5000/api/events", "Random");
        }
    }, [action, themeData.name]);

    const proposedEvent = eventQueue[currentEventIndex] || null;

    const handleDrop = (e) => {
        e.preventDefault();
        if (lives === 0 || isWin) return;
        if (!proposedEvent) return;

        const draggedElement = document.querySelector(".proposed-event");
        const elementWidth = draggedElement?.offsetWidth || 0;
        const newPosition = e.clientX - elementWidth / 2;
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
                const timelineWidth = document.getElementById("timeline")?.offsetWidth || window.innerWidth;

                const updatedEvents = sortedEvents.map((event, i, array) => {
                    const positionFraction = (i + 1) / (array.length + 1);
                    return {
                        ...event,
                        position: timelineWidth * positionFraction,
                        className: i % 2 === 0 ? 'above' : 'below'
                    };
                });

                setEvents(updatedEvents);
                setCurrentEventIndex(prev => {
                    const nextIndex = prev + 1;
                    if (nextIndex >= eventQueue.length) {
                        setIsWin(true);
                    }
                    return nextIndex;
                });
                setStreak(prev => {
                    const newStreak = prev + 1;
                    setMaxStreak(prevMax => {
                        if (newStreak > prevMax) {
                            setMaxStreakForTheme(themeData.name, newStreak);
                            return newStreak;
                        }
                        return prevMax;
                    });
                    return newStreak;
                });
            } else {
                setLives(prev => prev - 1);
            }

            setIsCorrect(null);
            setDroppedPosition(null);
        }, 1000);
    };

    return (
        <div className="timeline-container">
            <h1 className="theme-title">{themeData.name}</h1>
            <div className="stats-bar">
                <div>❤️ Vies : {lives}</div>
                <div>🔥 Streak : {streak}</div>
                <div>🏆 Meilleur streak : {maxStreak}</div>
            </div>
            <div
                id="timeline"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                style={{
                    backgroundImage: `url(${themeData.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
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
                        <div className="event-connector"></div>
                        <div className="event-dot"></div>
                    </div>
                ))}
                {droppedPosition !== null && proposedEvent && (
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

            {proposedEvent && droppedPosition === null && lives > 0 && !isWin && (
                <div className="proposed-event-container" draggable>
                    <div className="event proposed-event" style={{ backgroundImage: `url(${proposedEvent.Image})` }}>
                        {proposedEvent.Événement}
                    </div>
                </div>
            )}

            {lives === 0 && (
                <div className="game-over">
                    <h2>💀 Fin de la partie !</h2>
                    <p>Votre meilleur streak : {maxStreak}</p>
                    <button onClick={() => window.location.reload()}>🔁 Rejouer</button>
                </div>
            )}
            {isWin && (
                <div className="game-win">
                    <h2>👑 Bravo ! Vous avez terminé le thème avec succès !</h2>
                    <p>Votre meilleur streak : {maxStreak}</p>
                    <button onClick={() => window.location.reload()}>Rejouer</button>
                </div>
            )}
        </div>
    );
};

export default Timeline;
