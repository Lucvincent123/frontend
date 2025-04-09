import { useFormStatus } from "react-dom";

import styles from "./AddThemeForm.module.css"
import { useState } from "react";

export default function Form({ setAdd, refresh, setRefresh }) {
    const { pending } = useFormStatus();
    const [text, setText] = useState("")
    const [action, setAction] = useState("")
    const [img, setImg] = useState("")
    const [message, setMessage] = useState("")

    const submit = async() => {
        if (text !== "" && action !== "" && img !== "") {
            try {
                const response = await fetch("http://localhost:5000/api/categories", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                      },
                    body: JSON.stringify({ 
                        text: text,
                        action: Number(action),
                        imageUrl: img,
                    })
                })
                const data = await response.json()
                if (data.success) {
                    setMessage("New theme added")
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
            <label className={styles.label}>Theme</label>
            <input type="text" className={styles.input} placeholder="Theme" onChange={(e) => setText(e.target.value)} value={text}/>

            <label className={styles.label}>Action</label>
            <input type="text" className={styles.input} placeholder="Action" onChange={(e) => setAction(e.target.value)} value={action}/>

            <label className={styles.label}>Image</label>
            <input type="text" className={styles.input} placeholder="Image url" onChange={(e) => setImg(e.target.value)} value={img}/>

            <button className={styles.submit} type="submit" disabled={pending} onClick={submit}>
            {pending ? "Submitting..." : "Submit"}
            </button>
            <button className={styles.submit} onClick={() => setAdd(false)}>Cancel</button>
            <div>{message}</div>
        </div>
    );
}
