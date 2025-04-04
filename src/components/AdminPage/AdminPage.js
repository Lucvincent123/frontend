import styles from "./AdminPage.module.css"
import NavBar from "../AdminNavBar/AdminNavBar.js"
import { useState } from "react"
import CardDisplay from "../CardDisplay/CardDisplay.js"

export default function AdminPage() {
    const [main, setMain] = useState("Cards")
    const [isActive, setIsActive] = useState(false);

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/users")
    //     .then(response => response.json())
    //     .then(data => s)
    // }, []);
    return (
        <div className={styles.container}>
            <NavBar setMain={setMain} isActive={isActive} setIsActive={setIsActive}/>
            { main === "Cards" && <CardDisplay isActive={isActive}/>}
        </div>
    )
}