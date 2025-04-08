import { useEffect, useState } from "react";

import AddCardForm from "../AddCardForm/AddCardForm"
import ModifyCardForm from "../ModifyCardForm/ModifyCardForm"

import styles from "./CardDisplay.module.css"

export default function CardDisplay({ isActive }) {
    const [cards, setCards] = useState(null);
    const [add, setAdd] = useState(false)
    const [id, setId] = useState("");
    const [refresh, setRefresh] = useState(true);


    useEffect(() => {
        console.log("refresh")
        fetch("http://localhost:5000/api/events")
        .then(response => response.json())
        .then(data => setCards(data))
        .catch(error => console.log)
    }, [refresh]);

    const addHandler = (event) => {
        setAdd(true)
    } 

    const refreshHandler = () => {
        setRefresh(!refresh);
    }

    return (
        <div className={`${styles.container} ${isActive ? styles.active : styles.inactive}`}>
            <div className={styles.navbar}>
                <h1>Cards</h1>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={addHandler}>Add card</button>  
                    <button className={styles.button} onClick={refreshHandler}>Refresh</button> 
                </div>
            </div>
            {add && <AddCardForm setAdd={setAdd} refresh={refresh} setRefresh={setRefresh}/>}
            {id.length > 0 && <ModifyCardForm setId={setId} id={id} refresh={refresh} setRefresh={setRefresh}/>}
            <div className={styles.cardContainer}>
            {cards && cards.map((card) => <div onClick={() => setId(card._id)} className={`${styles.cardSpace} ${(add || id.length > 0) ? "" : styles.enabled}`}>
                <div className={styles.card}>
                    <img className={styles.image} alt={card.Événement} src={card.Image}></img>
                    <div>
                        <div className={styles.event}>{card.Événement}</div>
                        <div className={styles.year}>{card.Année}</div>
                        <hr className={styles.separate}></hr>
                        <div className={styles.categories}>{card.Catégories.map((category) => <div>{category}</div>)}</div>
                    </div>
                </div>
            </div>)}
            </div>
            
        </div>
    )
}