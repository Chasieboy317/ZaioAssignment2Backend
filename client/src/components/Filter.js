import React, {Component} from 'react';
import '../css/Filter.css';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    const filters = this.props.filters.map((name) => {return (<li key={name}><a>{name}</a></li>)})
    this.state = {
      filters,
      activeFilter: "Area"
    };
    this.props.updateFilter('area');
  }

  componentDidMount() {
  }

  getActiveFilter = () => {
    return this.state.activeFilter;
  }

  makeActiveFilter = (e) => {
    e.preventDefault();
    this.setState({activeFilter: e.target.id});
    this.props.updateFilter(e.target.id);
  }

  render () {
    const lineElement = (<div className="verticalLine" />);
    const activeStyle = ({color: "white"});
    const display = this.props.filters.map((name, i) => {
      if (name==this.state.activeFilter && i < this.props.filters.length-1) {
        return (<React.Fragment key={name}><li><a id={name}  style={activeStyle} onClick={this.makeActiveFilter}>{name}</a></li>{lineElement}</React.Fragment>);
      }
      else if (name==this.state.activeFilter) {
        return (<li key={name}><a id={name} style={activeStyle} onClick={this.makeActiveFilter}>{name}</a></li>);
      }
      else if (i < this.props.filters.length-1) {
        return (<React.Fragment key={name}><li><a id={name} onClick={this.makeActiveFilter}>{name}</a></li>{lineElement}</React.Fragment>);
      }
      else {
        return (<li key={name}><a id={name} onClick={this.makeActiveFilter}>{name}</a></li>);
      }
    });

    return (
      <div className="filter">
        <h2>Find by: </h2>
        <ul className="filterList">
          {display}
        </ul>
      </div>
    )
  }
}
