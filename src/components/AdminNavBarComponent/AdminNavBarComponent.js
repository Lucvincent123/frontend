import styles from "./AdminNavBarComponent.module.css"

export default function AdminNavBarComponent({ text, setMain }) {
    return (
        <div className={styles.button}
            onMouseDown={() => setMain(text)}
        >
            {text}
        </div>
    )
}