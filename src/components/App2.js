import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';


function App2() {
  const [items, setItems] = useState([
      // { id: 1, position: { x: 50, y: 50 }, image: 'https://i.imgur.com/HO21ehl.png', description: "vidu1", annee:1922 },
      // { id: 2, position: { x: 200, y: 100 }, image: 'https://i.imgur.com/0hZcHpu.jpeg' , description: "vidu2"},
      // { id: 3, position: { x: 350, y: 150 }, image: '/image1.png', description: "vidu3" },
      // { id: 4, position: { x: 500, y: 200 }, image: '/image1.png', description: "vidu4" },
    ]);
    const [targets] = useState([
      { id: "1", position: { x: 325, y: 200 }, color: 'lightblue' },
      { id: "2", position: { x: 500, y: 200 }, color: 'lightgreen' },
      { id: "3", position: { x: 675, y: 200 }, color: 'lightcoral' },
      { id: "4", position: { x: 850, y: 200 }, color: 'yellow' },
    ]);
    const [draggingItemId, setDraggingItemId] = useState(null);
    const dragOffset = useRef({ x: 0, y: 0 });
    const [isCorrect, setIsCorrect] = useState(false);
  
  
  
  
    useEffect(() => {
      fetch("http://localhost:5000/api/vietnam")
      .then(response => response.json())
      .then((data) => {
        console.log('API Data:', data); // Log the received data
        if (Array.isArray(data)) {
          // Check if data is an array
          const formattedItems = data.map((item) => ({
            id: item.id,
            position: { x: item.position.x, y: item.position.y },
            image: item.image,
            description: item.description
          }));
          setItems(formattedItems);
          console.log('Items:', formattedItems);
        } else {
          console.error('API trả về dữ liệu không phải là một mảng.');
        }
      })
      .catch((error) => console.error('Lỗi khi lấy dữ liệu:', error));
    }, []);
    const checkPositions = useCallback(() => {
      let correct = true;
      items.forEach((item) => {
        const target = targets.find((target) => target.id === item.id);
        if (
          Math.abs(item.position.x - target.position.x) > 10 ||
          Math.abs(item.position.y - target.position.y) > 10
        ) {
          correct = false;
        }
      });
      setIsCorrect(correct);
    }, [items, targets]);
    useEffect(() => {
      const handleMouseMove = (e) => {
        if (draggingItemId !== null) {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === draggingItemId
                ? {
                    ...item,
                    position: {
                      x: e.clientX - dragOffset.current.x,
                      y: e.clientY - dragOffset.current.y,
                    },
                  }
                : item
            )
          );
        }
      };
  
      const handleMouseUp = (e) => {
        setDraggingItemId(null);
        // e.target.style.transform = 'scale(1)'
      };
  
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [checkPositions,draggingItemId]);
  
    const handleMouseDown = (e, itemId) => {
      e.target.style.transform = 'scale(1.05)'
      const draggedItem = items.find((item) => item.id === itemId);
      if (draggedItem) {
        setDraggingItemId(itemId);
        dragOffset.current = {
          x: e.clientX - draggedItem.position.x,
          y: e.clientY - draggedItem.position.y,
        };
      }
    };
  
    
  return (
    <div style={{ height: '90vh', width: '20vw' }}>
      <div>
      <h1>Vietnam Theme</h1>
      <Link to="/">
  <button 
    style={{
      position: 'absolute',
      top: '50px',
      left: '10px',
      zIndex: 4, // Đảm bảo hiển thị trên cùng
      backgroundColor: 'blue', 
      color: 'white',
      padding: '10px',
      border: '1px solid black',
    }}
  >
    Go to Homepage
  </button>
  </Link>
      </div>
      <button 
  onClick={checkPositions}
  style={{
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 3, // Đảm bảo button hiển thị trên cùng
    backgroundColor: 'red', // Tăng độ tương phản nếu nền bị trùng màu
    padding: '10px',
    border: '1px solid black',
  }}
>
  Check Result
</button>
      {targets.map((target) => (
        <div
          key={target.id}
          style={{
            position: 'absolute',
            left: target.position.x,
            top: target.position.y,
            width: '155px',
            height: '232px',
            backgroundColor: 'lightgray',
            border: '2px dashed black',
            zIndex: 1,
          }}
        >
          {/* {`Target ${target.id}`} */}
        </div>
      ))}
      {items.map((item) => (

        <div
  key={item.id}
  onMouseDown={(e) => handleMouseDown(e, item.id)}
  style={{
    position: 'absolute',
    left: item.position.x,
    top: item.position.y,
    width: '150px',
    height: '220px',
    cursor: 'grab',
    zIndex: 2,
    border: '3px solid black',
    borderRadius: '10px',
    backgroundColor: '#d4c19c',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5px',
    boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    transition: 'transform 0.2s'
  }}
  
>
  {/* Hình ảnh của thẻ */}
  <div
    style={{
      width: '100%',
      height: '60%',
      borderBottom: '2px solid black',
    }}
  >
    <img 
      src={item.image} 
      alt={`Item ${item.id}`} 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
    />
  </div>

  {/* Miêu tả của thẻ */}
  <div
    style={{
      width: '100%',
      height: '40%',
      backgroundColor: 'rgba(201, 204, 27, 0.67)',
      padding: '5px',
      fontSize: '12px',
      overflow: 'hidden',
    }}
  >
    {item.description}
  </div>
</div>
        
      ))}
      
      {isCorrect && (
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '570px',
            zIndex: 5,
            backgroundColor: 'pink',
            padding: '10px',
          }}
        >
          Correct
        </div>
      )}
    </div>
  );
  }

export default App2;
