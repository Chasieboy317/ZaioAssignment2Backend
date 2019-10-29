import React, {Component} from 'react';
import {GoogleMap, Marker, withScriptjs, withGoogleMap} from "react-google-maps";
import '../css/MapElement.css';
//import MapProperty from './MapProperty';

function Map () {
  return (
      <GoogleMap defaultZoom={10} defaultCenter={{lat: -33, lng: 18}}>
      </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapElement() {
  return (
    <div id="mapElement">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{height: "100%"}} />}
        containerElement={<div style={{height: "100%"}} />}
        mapElement={<div style={{height: "100%"}} />}
      />
    </div>
  );
}
