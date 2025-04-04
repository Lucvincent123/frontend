import { useEffect, useState } from "react";

import AddCardForm from "../AddCardForm/AddCardForm"
import ModifyCardForm from "../ModifyCardForm/ModifyCardForm"

import styles from "./CardDisplay.module.css"

export default function CardDisplay({ isActive }) {
    const [cards, setCards] = useState(null);
    const [add, setAdd] = useState(false)
    const [id, setId] = useState("");


    useEffect(() => {
        fetch("http://localhost:5000/api/events")
        .then(response => response.json())
        .then(data => setCards(data))
        .catch(error => console.log)
    }, []);

    const addHandler = (event) => {
        setAdd(true)
    } 

    return (
        <div className={`${styles.container} ${isActive ? styles.active : styles.inactive}`}>
            <h1>Cards</h1>
            <button onClick={addHandler}>add card</button>
            {add && <AddCardForm setAdd={setAdd}/>}
            {id.length > 0 && <ModifyCardForm setId={setId} id={id}/>}
            <div className={styles.cardContainer}>
            {cards && cards.map((card) => <div onClick={() => setId(card._id)} className={`${styles.card} ${(add || id.length > 0) ? "" : styles.enabled}`}>
                <img className={styles.image} alt={card.Événement} src={card.Image}></img>
                <div>
                    <div>{card.Événement}</div>
                    <div>{card.Année}</div>
                    <div>{card.Catégories.map((category) => <div>{category}</div>)}</div>
                </div>
            </div>)}
            </div>
            
        </div>
    )
}