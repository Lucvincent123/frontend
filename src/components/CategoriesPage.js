import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomButton({ text, action, imageUrl }) {
  const navigate = useNavigate();

  const style = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '350px',
    height: '150px',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black',
    boxShadow: '3px 3px 8px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
    margin: '10px'
  };

  return (
    <button
      onClick={() => navigate(`/?action=${action}`)}
      style={style}
      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
    >
      {text}
    </button>
  );
}

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Erreur de chargement des catégories :", err));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px'}}>Choose a category :</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map((cat) => (
          <CustomButton
            key={cat.action}
            text={cat.text}
            imageUrl={cat.imageUrl}
            action={cat.action}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
