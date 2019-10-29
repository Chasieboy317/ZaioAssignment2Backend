import React, {Component} from 'react';
import PropertyList from './PropertyList';

class PropertyListAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: null
    }
    this.propertyList = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({delete: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.propertyList.current.deleteProps(this.state.delete);
  }

  render () {
    return (
      <div>
        <PropertyList ref={this.propertyList}/>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

export default PropertyListAPI;
