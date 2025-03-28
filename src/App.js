import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NotFoundPage from "./components/NotFoundPage";
import AdminPage from "./components/AdminPage"
import UserPage from "./components/UserPage";
import NavBar from "./components/NavBar";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<NavBar/>}>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="user/:userId" element={<UserPage/>}/>
            </Route>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}