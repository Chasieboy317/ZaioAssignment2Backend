import React, {Component} from 'react';
import Filter from './Filter';
import {Redirect} from 'react-router-dom';
import '../css/SearchBar.css';
import map from '../images/map.png';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      type: null,
      min: null,
      max: null,
      area: null,
      searchField: "",
      search: null,
      redirect: null
    }
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchField: e.target.value,
    });
  }

  handleSubmit = () => {
    this.props.updateFields(this.state.search, this.state.searchField);
    this.setState({redirect: (<Redirect to="/rent" />)});
  };

  getSearch = () => {
    this.setState({search: this.filterRef.current.getActiveFilter()});
  }

  updateFilter = (search) => {
    this.setState({search});
  };

  render () {
    return (
      <div className="blueBlock">
          <h1>Find your dream home</h1>
          <div className="searchBar">
            <input type="text" placeholder="Search for your home..." onChange={this.handleChange}/>
            <button type="submit" onClick={this.handleSubmit}>{this.state.redirect}Search</button>
          </div>
          <Filter ref={this.filterRef} updateFilter={this.updateFilter} filters={["Area", "Agency", "Address"]} />
          <img src={map} alt="" />
      </div>
    );
  }
}

export default SearchBar;
