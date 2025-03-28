import { Outlet } from "react-router-dom"

export default function NavBar() {
    return (
        <div>

            <nav>Navigator bar </nav>
            <Outlet/>
        </div>
    )
}