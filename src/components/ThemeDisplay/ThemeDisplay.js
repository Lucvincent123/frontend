import { useEffect, useState } from "react";
import styles from "./ThemeDisplay.module.css"
import AddThemeForm from "../AddThemeForm/AddThemeForm"
import ModifyThemeForm from "../ModifyThemeForm/ModifyThemeForm"


export default function ThemeDisplay({ isActive }) {
    const [themes, setThemes] = useState(null);
    const [add, setAdd] = useState(false)
    const [id, setId] = useState("");
    const [refresh, setRefresh] = useState(true);


    useEffect(() => {
        console.log("refresh")
        fetch("http://localhost:5000/api/categories")
        .then(response => response.json())
        .then(data => setThemes(data))
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
                <h1>Themes</h1>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={addHandler}>Add Theme</button>  
                    <button className={styles.button} onClick={refreshHandler}>Refresh</button> 
                </div>
            </div>
            {add && <AddThemeForm setAdd={setAdd} refresh={refresh} setRefresh={setRefresh}/>}
            {id.length > 0 && <ModifyThemeForm setId={setId} id={id} refresh={refresh} setRefresh={setRefresh}/>}
            <div className={styles.cardContainer}>
                {themes && themes.map((theme) => <div onClick={() => setId(theme._id)} className={`${styles.themeSpace} ${(add || id.length > 0) ? "" : styles.enabled}`}>
                    <div className={styles.theme}>
                        <img className={styles.image} alt={theme.text} src={theme.imageUrl}></img>
                        <div>
                            <div className={styles.event}>{theme.text}</div>
                            <div className={styles.year}>{theme.action}</div>
                            <hr className={styles.separate}></hr>
                        </div>
                    </div>
                </div>)}
            </div>
            
        </div>
    )
}
