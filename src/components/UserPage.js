import { useParams } from "react-router-dom"

export default function UserPage() {
    const { userId } = useParams()
    return (

        <h1>User id {userId}</h1>
    )
}