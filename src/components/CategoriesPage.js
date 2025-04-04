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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1>Catégories</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '820px',
        width: '100%',
        justifyItems: 'center',
        marginTop: '20px'
      }}>
        {buttons.map((btn, idx) => (
          <CustomButton key={idx} {...btn} />
        ))}
      </div>
    </div>
  );
}

export default App;
