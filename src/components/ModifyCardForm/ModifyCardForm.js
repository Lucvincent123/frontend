import { useFormStatus } from "react-dom";

import styles from "./ModifyCardForm.module.css"
import { useEffect, useState } from "react";

// function Submit({ setAdd }) {
//   const { pending } = useFormStatus();
//   return (
//     <div className={styles.addForm}>
//         <label className={styles.label}>Event</label>
//         <input type="text" className={styles.input} name="Événement" placeholder="Event"/>
//         <button type="submit" disabled={pending}>
//         {pending ? "Submitting..." : "Submit"}
//         </button>
//         <button onClick={() => setAdd(false)}>Cancel</button>
//     </div>
//   );
// }

// async function action(message) {
//     await new Promise((res) => setTimeout(res, 1000));
//     console.log(message);
//     return message;
// }

export default function Form({ setId, id, refresh, setRefresh}) {
    const { pending } = useFormStatus();
    const [event, setEvent] = useState("")
    const [year, setYear] = useState("")
    const [img, setImg] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState("")
    const [themes, setThemes] = useState(null)

    useEffect(() => {
        const getEvent = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`)
                const data = await response.json()
                if (data.success) {
                    setEvent(data.data.Événement)
                    setYear(data.data.Année)
                    setImg(data.data.Image)
                    setCategories(data.data.Catégories)
                    console.log(data.data)
                }
                setMessage(data.message)
            } catch (error) {
                setMessage(error.message)
            }
        }

        getEvent()
    }, [id])

    useEffect(() => {
            fetch("http://localhost:5000/api/categories")
            .then(response => response.json())
            .then(data => setThemes(data))
            .catch(error => console.log)
    }, []);

    const modify = async() => {
        if (event !== "" && year !== "" && img !== "" && categories.length > 0) {
            console.log("hello")
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                    body: JSON.stringify({ 
                        _id: id,
                        ID: 1,
                        Événement: event,
                        Année: year,
                        Catégories: categories,
                        Image: img,
                    })
                })
                const data = await response.json()
                console.log(data)
                if (data.success) {
                    setMessage("Event updated")
                    setRefresh(!refresh)
                    return;
                }
                setMessage(data.message)
            } catch (error) {
                setMessage(error.message)
            }
        } else {setMessage("Please fill all the fields")}
        
    }

    const remove = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/events/${id}`, {
                    method: "DELETE",                    
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
            })
            const data = await response.json()
            if (data.success) {
                setRefresh(!refresh)
                return setMessage("Event deleted")
            }
            setMessage(data.message)
        } catch (error) {
            setMessage(error.message)
        }
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
            {categories.map((category, index) => {
                return <div className={styles.category} onClick={() => setCategories(categories.filter((item => item !== category)))}>{category}</div>
            })}
            <button className={styles.submit} type="submit" disabled={pending} onClick={modify}>
            {pending ? "Updating..." : "Update"}
            </button>
            <button className={styles.submit} type="submit" disabled={pending} onClick={remove}>
            {pending ? "Deleting..." : "Delete"}
            </button>
            <button className={styles.submit} onClick={() => setId("")}>Cancel</button>
            <div>{message}</div>
        </div>
    );
}
