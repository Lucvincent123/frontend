
import styles from "./AdminNavBar.module.css"
import AdminNavBarComponent from "../AdminNavBarComponent/AdminNavBarComponent";

export default function AdminNavBar({ setMain, isActive, setIsActive }) {
    
    const navBar = (
        <div className={styles.navBar}>
            <i className={`fa-solid fa-bars fa-2x ${styles.menuButton}`}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                onMouseLeave={() => setIsActive(false)}
            ></i>
        </div>
    )

    const navBarActive = (
        <div className={styles.navBarActive}>
            <i className={`fa-solid fa-bars fa-2x ${styles.menuButton}`}
                onMouseDown={() => setIsActive(false)}
                onMouseUp={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(true)}
            ></i>

            <AdminNavBarComponent text="Cards" setMain={setMain}/>
            <AdminNavBarComponent text="Theme" setMain={setMain}/>

        </div>
    )
    
    if (isActive) return navBarActive
    return navBar;
}