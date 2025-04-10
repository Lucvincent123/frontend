import { useFormStatus } from "react-dom";

import styles from "./AddCardForm.module.css"
import { useEffect, useState } from "react";

export default function Form({ setAdd, refresh, setRefresh }) {
    const { pending } = useFormStatus();
    const [event, setEvent] = useState("")
    const [year, setYear] = useState("")
    const [img, setImg] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState("")
    const [themes, setThemes] = useState(null)
    useEffect(() => {
            fetch("http://localhost:5000/api/categories")
            .then(response => response.json())
            .then(data => setThemes(data))
            .catch(error => console.log)
    }, []);


    const submit = async() => {
        if (event !== "" && year !== "" && img !== "" && categories.length > 0) {
            try {
                const response = await fetch("http://localhost:5000/api/events", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                    body: JSON.stringify({ 
                        ID: 1,
                        Événement: event,
                        Année: year,
                        Catégories: categories,
                        Image: img,
                    })
                })
                const data = await response.json()
                if (data.success) {
                    setMessage("New event created")
                    setRefresh(!refresh);
                    return;
                }
                setMessage(data.message)
            } catch (error) {
                setMessage(error.message)
            }
        } else {setMessage("Please fill all the fields")}
        
    }

    return (
        <div className={styles.addForm}>
            <label className={styles.label}>Event</label>
            <input type="text" className={styles.input} placeholder="Event" onChange={(e) => setEvent(e.target.value)} value={event}/>

            <label className={styles.label}>Year</label>
            <input type="text" className={styles.input} placeholder="Year" onChange={(e) => setYear(e.target.value)} value={year}/>

            <label className={styles.label}>Image</label>
            <input type="text" className={styles.input} placeholder="Image url" onChange={(e) => setImg(e.target.value)} value={img}/>

            <label className={styles.label}>Category</label>
            <select id="theme" onChange={(e) => setCategory(e.target.value)}>
                <option value="">--Please choose an option--</option>
                {themes && themes.map((theme) => <option value={theme.text}>{theme.text}</option>)}
            </select>
            <button className={styles.submit} onClick={() => setCategories(categories.concat(Array(category)))}>+</button>
            {categories.map((category) => {
                return <div className={styles.category} onClick={() => setCategories(categories.filter((item => item !== category)))}>{category}</div>
            })}
            <button className={styles.submit} type="submit" disabled={pending} onClick={submit}>
            {pending ? "Submitting..." : "Submit"}
            </button>
            <button className={styles.submit} onClick={() => setAdd(false)}>Cancel</button>
            <div>{message}</div>
        </div>
    );
}
