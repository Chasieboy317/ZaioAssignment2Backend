import React from 'react';
import '../css/Home.css';
import map from '../images/map.png';
import MapElement from './Map';

function Home() {
  return (
      <div className="googleMap">
        <h1> Browse Properties around South Africa </h1>
        <MapElement />
      </div>
  );
}

export default Home;
