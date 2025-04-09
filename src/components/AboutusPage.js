import React from 'react';
import '../styles/AboutUs.css';

// const AboutusPage = () => {
//   const members = [
//     {
//       name: 'Julien',
//       imageUrl: ,
//     },
//     {
//       name: 'Paul',
//       imageUrl: ,
//     },
//     {
//       name: 'Dang',
//       imageUrl: ,
//     },
//     {
//       name: 'Thien',
//       imageUrl: ,
//     },
//   ];

//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>À propos de nous</h1>
//       <p>Application imaginée et développée par Thien, Dang, Julien et Paul en TC.</p>

//       <div style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         gap: '30px',
//         marginTop: '30px'
//       }}>
//         {members.map((member, idx) => (
//           <div key={idx} style={{ textAlign: 'center' }}>
//             <img
//               src={member.imageUrl}
//               alt={member.name}
//               style={{
//                 width: '250px',
//                 height: 'auto',
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
//               }}
//             />
//             <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{member.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AboutusPage;


const AboutusPage = () => {
    const members = [
      { name: 'Julien', imageUrl: 'https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-1/460369630_122117006186458912_797290151071691533_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=e99d92&_nc_ohc=fNQNUNCcYOwQ7kNvwFtlmhQ&_nc_oc=AdnxsWRwOVFf9VB11yFQdFa1kdnDzxIdzgXaA__GcJIf8GumEUt3W1XVfFKW_XOSn1I&_nc_zt=24&_nc_ht=scontent-mrs2-1.xx&_nc_gid=vgihjb4PrO-fVReNjP-cFw&oh=00_AfG4jJEkTOdDl4q4VQdkERjLIvbF3wWHYr0Fje5Jc-doKw&oe=67FC53CE' },
      { name: 'Paul', imageUrl: 'https://scontent-mrs2-3.xx.fbcdn.net/v/t39.30808-1/486847348_122141784356519961_8949841681983967718_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Okel7LPcElMQ7kNvwExdXK1&_nc_oc=AdmMB4rLXKRybwQhkY0yLMGNL7r_u7kNy0NpTlh_VLKVMVa-BLTD_wPqppCR7uPdQxg&_nc_zt=24&_nc_ht=scontent-mrs2-3.xx&_nc_gid=gvoNKLXz1iLSB2V4kyl2Jg&oh=00_AfGopNDIHuW9V-kKVaTKmU9wxsG6VpGK4xu3ENJM7GRyow&oe=67FC4D67' },
      { name: 'Dang', imageUrl: 'https://scontent-mrs2-2.xx.fbcdn.net/v/t39.30808-1/417391713_1427167764845594_5382471139849443159_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_ohc=Ywwej1Ly7CgQ7kNvwFIcdEo&_nc_oc=Adn3JwBAfZcH93fYTVduuQebOqirjLkCcpngmLLgyzl0UnzT27LdItLCUTLrqx5Wf_0&_nc_zt=24&_nc_ht=scontent-mrs2-2.xx&_nc_gid=OO17lOiDjpiFKZuO8oMRTg&oh=00_AfHDhzjcPSEp5o1LhKgUAIHD4Dw_4S4yjIIswNwPYauERA&oe=67FC3A30' },
      { name: 'Thien', imageUrl: 'https://scontent-mrs2-2.xx.fbcdn.net/v/t39.30808-6/448928549_1500390664194512_688979337814590544_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=rVLiNY-V3dYQ7kNvwFrHz-S&_nc_oc=Adlq0FkU4U2yx3Aye_Njux4juQZl3gQ8SkzsbSPf6yue1S-SAW-Q6mg5GolDt7Hov1k&_nc_zt=23&_nc_ht=scontent-mrs2-2.xx&_nc_gid=9OquwxYuZMcUKroUxjPYQg&oh=00_AfHH0Ve3R9FPJNlbXhU_XiqrgLhBquJby6n2KWe-T6-AOA&oe=67FADF99' },
    ];
  
    return (
      <div className="aboutus-container">
        <h1>About us</h1>
        <p>Application designed and developed by Julien, Dang, Paul and Thien, students in the TC department at INSA Lyon.</p>
  
        <div className="aboutus-images">
          {members.map((member, idx) => (
            <div key={idx}>
              <div className="aboutus-card">
                <img src={member.imageUrl} alt={member.name} />
                <p className="aboutus-name">{member.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9gJTh_4VHoGugBKF6FT1t0TbazBLDKzoWsw&s" alt="Logo" style={{ width: '500px', height: 'auto' }} />
              </div>
      </div>
    );
  };
  
  export default AboutusPage;