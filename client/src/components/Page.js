import React, {Component} from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import PropertyList from './PropertyList';
import PropertyDetails from './PropertyDetails';
import SearchBar from './SearchBar';

export default class Page extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchField: "",
      search: null
    };
    this.searchBarRef = React.createRef();
  }

  updateFields = (search, searchField) => {
    this.setState({search, searchField});
    console.log(this.state);
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <SearchBar ref={this.searchBarRef} updateFields = {this.updateFields}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/rent" component={() => {return (<PropertyList search={this.state.search} payload={this.state.searchField} />)}} />
            <Route path="/properties/details/:property_id" component={PropertyDetails} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
