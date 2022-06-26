import React from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import logo from '../img/logo.png';
function Home() {
  return (
    <div className='home' style={{minHeight:"550px"}}>
      <p style={{ fontFamily:" 'Brush Script MT', 'cursive'",fontSize:"49px",textAlign:"center"}}>Bienvenue au tableau de bord du système intelligent Brace-Help</p>
      <img src={logo}  height="400px" style={{marginLeft:"450px"}} />
    </div>
  );
}

export default Home;
