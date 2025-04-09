import { useFormStatus } from "react-dom";

import styles from "./ModifyThemeForm.module.css"
import { useEffect, useState } from "react";


export default function Form({ setId, id, refresh, setRefresh}) {
    const { pending } = useFormStatus();
    const [text, setText] = useState("")
    const [action, setAction] = useState("")
    const [img, setImg] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const getEvent = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/categories/${id}`)
                const data = await response.json()
                if (data.success) {
                    setText(data.data.text)
                    setAction(String(data.data.action))
                    setImg(data.data.imageUrl)
                    console.log(data.data)
                }
                setMessage(data.message)
            } catch (error) {
                setMessage(error.message)
            }
        }

        getEvent()
    }, [id])

    const modify = async() => {
        if (text !== "" && action !== "" && img !== "") {
            try {
                const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                    body: JSON.stringify({ 
                        _id: id,
                        text: text,
                        action: action,
                        imgUrl: img,
                    })
                })
                const data = await response.json()
                console.log(data)
                if (data.success) {
                    setMessage("Theme updated")
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
            const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
                    method: "DELETE",                    
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
            })
            const data = await response.json()
            if (data.success) {
                setRefresh(!refresh)
                return setMessage("Theme deleted")
            }
            setMessage(data.message)
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div className={styles.addForm}>
            <label className={styles.label}>Theme</label>
            <input type="text" className={styles.input} placeholder="Theme" onChange={(e) => setText(e.target.value)} value={text}/>

            <label className={styles.label}>Action</label>
            <input type="text" className={styles.input} placeholder="Action" onChange={(e) => setAction(e.target.value)} value={action}/>

            <label className={styles.label}>Image</label>
            <input type="text" className={styles.input} placeholder="Image url" onChange={(e) => setImg(e.target.value)} value={img}/>

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
