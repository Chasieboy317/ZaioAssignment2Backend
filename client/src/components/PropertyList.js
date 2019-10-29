import React, {Component} from 'react';
import PropertyCard from './PropertyCard';
import '../css/PropertyList.css';
import axios from 'axios';

export default class PropertyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    }
    this.addProps = this.addProps.bind(this);
    this.deleteProps = this.deleteProps.bind(this);
  }

  componentDidMount() {
    if (this.props.payload=="") this.getDataFromDb();
    else this.searchDb();
  }

  addProps(prop) {
    const newProps = [prop, ...this.state.properties];
    this.setState({properties: newProps});
  }

  deleteProps(prop) {
    const newProps = this.state.properties.filter((p) => {return p.props.id!=prop});
    this.setState({properties: newProps});
    console.log("deletePros called with id of %s", prop);
  }

  getDataFromDb = () => {
  let data = [];
    fetch(`api/getPropertyData`)
      .then((data) => data.json())
      .then((res) => res.data.length>0 ? this.setState({properties: res.data.map((x) => {
        return (<PropertyCard key={x._id} id={x.id} price={x.price} type={x.type} area={x.area} address={x.address} description={x.description} /> )
      })}
      ) : this.setState({properties: (<h1 style={{margin: "5em auto"}}>Sorry! We didn't find anything...</h1>)})
      );
  };

  searchDb = () => {
    fetch(`api/getPropertyData/${this.props.search}/${this.props.payload}`)
      .then((data) => data.json())
      .then((res) => res.data.length>0 ? this.setState({properties: res.data.map((x) => {
        return (<PropertyCard key={x._id} id={x.id} price={x.price} type={x.type} area={x.area} address={x.address} description={x.description} /> )
      })}
      ) : this.setState({properties: (<h1 style={{margin: "5em auto"}}>Sorry! We didn't find anything...</h1>)})
      );
  };

  render () {
    return (
      <ol>
        {this.state.properties}
      </ol>
    );
  }
}
