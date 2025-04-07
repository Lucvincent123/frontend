import React, { useState, useEffect } from 'react';
import '../styles/Timeline.css';
import { useLocation } from "react-router-dom";

const themeMapping = {
    "0": { name: "Vietnam", image: "https://www.worldatlas.com/upload/a6/4c/2e/vn-flag.jpg" },
    "1": { name: "Science", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6LEDKkakNSqbYbUWuFbxeX5-JmxSQAr-rA&s" },
    "2": { name: "Histoire", image: "https://static.lpnt.fr/images/2012/07/03/la-liberte-guidant-le-peuple-delacroix_423221_660x287.jpg" },
    "3": { name: "INSA", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Logo_INSA_Lyon_%282014%29.svg/2560px-Logo_INSA_Lyon_%282014%29.svg.png" },
    "10": { name: "Random", image: "https://images.photowall.com/products/47903/world-map-detailed-without-roads.jpg?h=699&q=85" },
    "4": { name : "Sport", image: "https://www.calvados.fr/files/live/sites/calvados/files/documents/images/actualites/regard-des-jeunes-de-15-ans-PBCN2018-1140.jpg"}
  };
 
const Timeline = () => {
    const [events, setEvents] = useState([]);
    const [eventQueue, setEventQueue] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [droppedPosition, setDroppedPosition] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const action = params.get("action");
    const [lives, setLives] = useState(3);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const getMaxStreakForTheme = (theme) => {
        const savedStreaks = JSON.parse(localStorage.getItem("themeMaxStreaks") || "{}");
        return savedStreaks[theme] || 0;
    };
    
    const setMaxStreakForTheme = (theme, streak) => {
        const savedStreaks = JSON.parse(localStorage.getItem("themeMaxStreaks") || "{}");
        savedStreaks[theme] = streak;
        localStorage.setItem("themeMaxStreaks", JSON.stringify(savedStreaks));
    };
    
    useEffect(() => {
        const themeData = themeMapping[action] || { name: "", image: "" };
        setMaxStreak(getMaxStreakForTheme(themeData.name));
        const fetchData = (url, theme = "") => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("Données récupérées:", data);
                    if (theme === "Random") {
                        data = data.filter(evenement =>
                            evenement.Catégories.includes("Science") ||
                            evenement.Catégories.includes("Histoire") ||
                            evenement.Catégories.includes("Sport")
                        );
                        console.log("Données récupérées:", data);
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
    
        if (action === "1") {
            fetchData("http://localhost:5000/api/events", "Science");
        } else if (action === "2") {
            fetchData("http://localhost:5000/api/events", "Histoire");
        } else if (action === "0") {
            fetchData("http://localhost:5000/api/events", "Vietnam");
        } else if (action === "3") {
            console.log("Chargement des événements depuis /api/events_insa...");
            fetchData("http://localhost:5000/api/events_insa");
        } else if (action === "10") {
            fetchData("http://localhost:5000/api/events", "Random");
        } else if (action === "4") {
            fetchData("http://localhost:5000/api/events", "Sport");
        } else {
            fetchData("http://localhost:5000/api/events", "Random");
        }
        
    
        console.log("Thème sélectionné :", themeData.name);
        console.log("Image du thème :", themeData.image);
    }, [action]);
    

    const proposedEvent = eventQueue[currentEventIndex] || null;

    const handleDrop = (e) => {
        e.preventDefault();
        if (!proposedEvent) return;

        const newPosition = e.clientX;
        setDroppedPosition(newPosition);

        const sortedEvents = [...events, { ...proposedEvent, position: newPosition }].sort((a, b) => a.position - b.position);
        console.log("Événements triés :", sortedEvents);
        const index = sortedEvents.findIndex(e => e.ID === proposedEvent.ID);
        const leftEvent = sortedEvents[index - 1];
        const rightEvent = sortedEvents[index + 1];
        console.log("Événement gauche :", leftEvent);
        console.log("Événement droit :", rightEvent);
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
                setStreak(prev => {
                    const newStreak = prev + 1;
                    setMaxStreak(prevMax => {
                        if (newStreak > prevMax) {
                            setMaxStreakForTheme(themeMapping[action]?.name, newStreak);
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
            <h1 className="theme-title">{themeMapping[action]?.name}</h1>
            <div className="stats-bar">
                <div>❤️ Vies : {lives}</div>
                <div>🔥 Streak : {streak}</div>
                <div>🏆 Meilleur streak : {maxStreak}</div>
            </div>
            <div id="timeline"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{
                backgroundImage: `url(${themeMapping[action]?.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}> 
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

{lives === 0 && (
                <div className="game-over">
                    <h2>💀 Fin de la partie !</h2>
                    <p>Votre meilleur streak : {maxStreak}</p>
                    <button onClick={() => window.location.reload()}>🔁 Rejouer</button>
                </div>
            )}
        </div>
    );
};

export default Timeline;
