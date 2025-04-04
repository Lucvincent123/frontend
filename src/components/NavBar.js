import { Outlet, Link } from "react-router-dom";
import '../styles/NavBar.css';
export default function NavBar() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 shadow-lg">
                <nav className="flex justify-between items-center">
                    <h1 className="text-lg font-bold">TimeTime</h1>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/categories" className="hover:underline">Categories</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:underline">About us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex-grow p-4">
                <Outlet />
            </main>
        </div>
    );
}
