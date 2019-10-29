import React, {Component} from 'react';
import ImageSlider from './ImageSlider';
import '../css/PropertyDetails.css';
import {Link} from 'react-router-dom';

const Format = require('./Format');

class PropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      type: "",
      area: "",
      address: "" ,
      description: "",
      size: 0,
      agency: ""
    }
  }

  componentDidMount() {
    this.setState({images: require(`../images/properties/${this.props.match.params.property_id}/index.jpg`), property_id: this.props.match.params.property_id})
    this.getPropertyData();
  }

  bookViewing() {
    alert("Coming Soon!");
  }

  getPropertyData = () => {
    fetch(`http://${process.env.PORT||8080}/api/getSinglePropertyData/${this.props.match.params.property_id}`)
      .then((data) => data.json())
      .then((res) => {
          this.setState(
          {
            price: res.data.price,
            type: res.data.type,
            area: res.data.area,
            address: res.data.address,
            description: res.data.description,
            size: res.data.size,
            agency: res.data.agency,
          }
        );
      });
  }

  render () {
    return (
      <React.Fragment>
      <div style={{width: "70vw", margin: "1em auto", textAlign:"left"}}>
        <Link to="/rent">Back to results</Link>
        <button id="bookViewing" onClick={this.bookViewing}>Book Viewing</button>
      </div>
      <div className="propDetailsDocument">
        <div className = "propDetailsHeader">
          <h2 id="propDetailsPrice">{`R${Format.formatNumber(this.state.price)}`}</h2>
          <h2 id="propDetailsType">{Format.formatType(this.state.type)}</h2>
          <h2 id="propDetailsSize">size: {this.state.size}m<sup>2</sup></h2>
          <h2 id="propDetailsArea">{this.state.area}</h2>
          <h2 id="propDetailsAddress">{this.state.address}</h2>
        </div>
        <hr style={{width: "98%", margin: "auto", borderTop: "1px solid #ccc"}} />
        <div id = "propDetailsBody">
          <div id="propDetailsImage"> <ImageSlider id={this.props.match.params.property_id} />
            <hr style={{width: "98%", margin: "1em auto 0 auto", borderTop: "1px solid #ccc"}} />
          </div>
          <div id = "propDetailsContact">
            <form className="contactForm">
              <h4 style={{margin: "0.5em auto", height: "3vh", background: "#ddeeff", borderRadius: "5px"}}>Agency</h4>
              <h4 style={{margin: "0.5em auto"}}>{this.state.agency}</h4>
              <hr style={{width: "99%", margin: "auto", borderTop: "1px solid #ccc"}}/>
              <h4 style={{margin: "1em auto 0.5em auto", background: "#ddeeff", borderRadius: "5px"}}>Get in touch with us!</h4>
              <input type="text" placeholder="Your Name" />
              <input type="text" placeholder="Your Email" />
              <input type="text" placeholder="Your Mobile Number" />
              <textarea rows="8" style={{width: "93%", textAlign: "left", padding: "0.5em"}}>I would love to know more about this property. Please tell me more!</textarea>
              <button>Send Message</button>
              <hr style={{width: "99%", margin: "0.5em auto", borderTop: "1px solid #ccc"}}/>
            </form>
          </div>
          <div id = "propDetailsDescription"><h1 style={{fontSize: "20px", textAlign: "left", marginBottom:"0.5em"}}>Description</h1>{this.state.description}</div>
          <div id = "propDetailsAgency">
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default PropertyDetails;
