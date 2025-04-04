import { useNavigate } from "react-router-dom";

function CustomButton({ text, imageUrl, action }) {
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
  return (
    
    <div>
    <h1>Home page</h1>
      <CustomButton
        text="Random"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Vietnam"
        imageUrl="https://www.worldatlas.com/upload/a6/4c/2e/vn-flag.jpg"
        action={1}
      />
      <CustomButton
        text="Sujet1"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Sujet2"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Sujet3"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Sujet6"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Sujet7"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Sujet8"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Sujet9"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
      <CustomButton
        text="Sujet10"
        imageUrl="https://th.bing.com/th/id/OIP.asnc_8Y-ZNgLVM0thkfLAgHaE9?rs=1&pid=ImgDetMain"
        action={2}
      />
    </div>
  );
}

export default App;
