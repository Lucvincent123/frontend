import { useNavigate } from "react-router-dom";

function CustomButton({ text, action ,imageUrl  }) {
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

function App() {
  const buttons = [
    { text: "INSA", action: 1, imageUrl: "https://www.ceo-vision.com/sites/default/files/logo-insa_0.png" },
    { text: "Moyen-Âge", action: 2, imageUrl: "https://www.castlemaniac.com/wp-content/uploads/2001/01/Moyen-age-1.jpg" },
    { text: "Contemporain", action: 3, imageUrl: "https://st4.depositphotos.com/1025323/19901/i/450/depositphotos_199014442-stock-illustration-stained-glass-forever-series-interplay.jpg" },
    { text: "Vietnam", action: 4, imageUrl: "https://www.worldatlas.com/upload/a6/4c/2e/vn-flag.jpg" },
    { text: "Science", action: 5, imageUrl: "https://www.sfpnet.fr/uploads/11996885_s.jpg" },
    { text: "Sport", action: 6, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Sport_balls.svg/400px-Sport_balls.svg.png" },
    { text: "Moderne", action: 7, imageUrl: "https://c8.alamy.com/compfr/wwmxkh/collage-de-tete-humaine-molecules-et-differents-elements-abstraits-sur-le-sujet-de-la-science-moderne-chimie-physique-humain-et-l-esprit-wwmxkh.jpg" },
    { text: "Antiquité", action: 8, imageUrl: "https://img-31.ccm2.net/4cK93KybiJqufRNBkvzaOJMRjLg=/1240x/smart/d7a3f764b6a7403aae805a7a8ff4616e/ccmcms-hugo/30431035.jpg" },
    { text: "Sujet9", action: 9, imageUrl: "https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain" },
    { text: "Random", action: 10, imageUrl: "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg" },
  ];

  return (
    
    <div>
    <h1>Choose a category :</h1>
      <CustomButton
        text="Random"
        imageUrl="https://images.photowall.com/products/47903/world-map-detailed-without-roads.jpg?h=699&q=85"
        action={10}
      />
      <CustomButton
        text="Vietnam"
        imageUrl="https://www.worldatlas.com/upload/a6/4c/2e/vn-flag.jpg"
        action={0}
      />
      <CustomButton
        text="Science"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn6LEDKkakNSqbYbUWuFbxeX5-JmxSQAr-rA&s"
        action={1}
      />
      <CustomButton
        text="Histoire"
        imageUrl="https://static.lpnt.fr/images/2012/07/03/la-liberte-guidant-le-peuple-delacroix_423221_660x287.jpg"
        action={2}
      />
      <CustomButton
        text="INSA"
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Logo_INSA_Lyon_%282014%29.svg/2560px-Logo_INSA_Lyon_%282014%29.svg.png"
        action={3}
      />
      <CustomButton
        text="Sport"
        imageUrl="https://www.calvados.fr/files/live/sites/calvados/files/documents/images/actualites/regard-des-jeunes-de-15-ans-PBCN2018-1140.jpg"
        action={4}
      />
      <CustomButton
        text="Sujet5"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={5}
      />
      <CustomButton
        text="Sujet6"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={6}
      />
      <CustomButton
        text="Sujet7"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={7}
      />
      <CustomButton
        text="Sujet8"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={8}
      />
    </div>
  );
}

export default App;
