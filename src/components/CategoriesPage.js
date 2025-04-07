import { useNavigate } from "react-router-dom";

function CustomButton({ text, action, imageUrl }) {
  const navigate = useNavigate();

  const style = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '200px',
    height: '50px',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
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
  const buttons = [
    { text: "Random", action: 10, imageUrl: "https://images.photowall.com/products/47903/world-map-detailed-without-roads.jpg?h=699&q=85" },
    { text: "Vietnam", action: 0, imageUrl: "https://www.worldatlas.com/upload/a6/4c/2e/vn-flag.jpg" },
    { text: "Science", action: 1, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6LEDKkakNSqbYbUWuFbxeX5-JmxSQAr-rA&s" },
    { text: "Histoire", action: 2, imageUrl: "https://static.lpnt.fr/images/2012/07/03/la-liberte-guidant-le-peuple-delacroix_423221_660x287.jpg" },
    { text: "INSA", action: 3, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Logo_INSA_Lyon_%282014%29.svg/2560px-Logo_INSA_Lyon_%282014%29.svg.png" },
    { text: "Sport", action: 4, imageUrl: "https://www.calvados.fr/files/live/sites/calvados/files/documents/images/actualites/regard-des-jeunes-de-15-ans-PBCN2018-1140.jpg" },
    { text: "Sujet5", action: 5, imageUrl: "https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain" },
    { text: "Sujet6", action: 6, imageUrl: "https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain" },
    { text: "Sujet7", action: 7, imageUrl: "https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain" },
    { text: "Sujet8", action: 8, imageUrl: "https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain" },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Choose a category :</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {buttons.map((btn, idx) => (
          <CustomButton
            key={idx}
            text={btn.text}
            imageUrl={btn.imageUrl}
            action={btn.action}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
