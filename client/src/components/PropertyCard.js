import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/PropertyCard.css';

const Format = require('./Format');

class PropertyCard extends Component {
  constructor(props) {
    super(props);
  }

  displayDetails() {
    console.log("user clicked on property card");
  }

  render () {
    const images = require(`../images/properties/${this.props.id}/index.jpg`);
    const thumb = images;
    return (
      <Link to={`/properties/details/${this.props.id}`} style={{textDecoration: "none"}}>
      <div className="card" >
        <img src={thumb} id="image" />
        <div id="details">
          <h1 id="price">{`R${Format.formatNumber(this.props.price)}`}</h1>
          <h5 id="type">{`${this.props.type} Bedroom House`}</h5>
          <h5 id="area">{this.props.area}</h5>
          <h5 id="address">{this.props.address}</h5>
          <p id="description">{Format.reduceString(this.props.description)}</p>
        </div>
      </div>
      </Link>
    )
  }
}

export default PropertyCard;
