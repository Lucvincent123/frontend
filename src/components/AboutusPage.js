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
      { name: 'Julien', imageUrl: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/460369630_122117006186458912_797290151071691533_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=SWF9_URNqzAQ7kNvwE5An_7&_nc_oc=AdlFRNOlsBlb3g0YUKERWyawA--pIaG6_Ry-nsx-N3bfBsVUOTZYoxENM_nIwfn2GFA&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=61DWPKGrnJvHT-NDRc8T2g&oh=00_AYFihELKdHmpeUZWUF9IRSNQnMndailOfO4fneUtumnP_A&oe=67F60CBE' },
      { name: 'Paul', imageUrl: 'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/486847348_122141784356519961_8949841681983967718_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=86tDLVbRH-IQ7kNvwGZNw0g&_nc_oc=AdmkOVuoBfSGIrZYecSPYAv9O_HcrPfKyXE_wP1AzHtCkI4eIygrdNeKwrNvwqim1ew&_nc_zt=23&_nc_ht=scontent-cdg4-3.xx&_nc_gid=pncY0oSz-ZL79zg109qWuw&oh=00_AYGZtp5Rd2lJ1eXV7axK2jdMaMeV45u8H02hdKmhLaKYAQ&oe=67F60C44' },
      { name: 'Dang', imageUrl: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/417391713_1427167764845594_5382471139849443159_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XQ_UGcBgSVcQ7kNvwGQ2WDA&_nc_oc=AdmoKYKKybC555tj-OBVk2XIrouheCZQOZfon7QKOYK1k_3P-nC4Sj_7UpHhuDlkiOQ&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=D5QQPP1fwEID0mYEyDav1A&oh=00_AYGCF8w4a4yLSKMQAvwYtvw7pROIG1YFLjLyeNNfpXWLRQ&oe=67F5F5AE' },
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