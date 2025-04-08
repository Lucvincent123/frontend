import { Link } from "react-router";

export default function NotFoundPage() {
    const pageStyle = {
        backgroundImage: "url('https://example.com/your-image.jpg')", // Remplacez par l'URL de votre image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", // Hauteur de la page entière
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white", // Couleur du texte pour contraster avec l'image
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)", // Ombre pour rendre le texte lisible
    };

    return (
        <div style={pageStyle}>
            <h1 style={{ color: "black" }}>404 Not Found</h1>
            <Link to="/" style={{ color: "black", textDecoration: "underline" }}>
                Back to home page
            </Link>
        </div>
    );
}