import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import logo from '../images/logo.png';
import SignupLogin from './SignupLogin';
import '../css/Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.signupLoginElement = React.createRef();
    this.displaySignUp = this.displaySignUp.bind(this);
    this.displayLogin = this.displayLogin.bind(this);
    this.state = {
      navlinks: (
          <ul className="navlinks">
            <NavLink activeClassName="active" to="/login" onClick = {this.displayLogin} style={{color: "#0d63c9", fontWeight: "bold"}}>Login</NavLink>
            <NavLink activeClassName="active" to="/signup" onClick= {this.displaySignUp} style={{color: "#f04432", fontWeight: "bold"}}>Sign Up</NavLink>
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/rent">Properties</NavLink>
            <NavLink activeClassName="active" to="/dev">Developments</NavLink>
            <NavLink activeClassName="active" to="/com">Commercial</NavLink>
            <NavLink activeClassName="active" to="/calc">Calculators</NavLink>
            <NavLink activeClassName="active" to="/adv">Advice</NavLink>
            <NavLink activeClassName="active" to="/pri">List Privately</NavLink>
            <NavLink activeClassName="active" to="/bell">bell</NavLink>
          </ul>
        ),
    navActive: false
    };
  }

  displaySignUp (e) {
    e.preventDefault();
    this.signupLoginElement.current.display("signup");
  }

  displayLogin(e) {
    e.preventDefault();
    this.signupLoginElement.current.display("login");
  }

  navSlide = () => {
    const navActive = !this.state.navActive;
    const navclass = navActive ? 'nav-active' : 'navlinks';
    const hr = (<hr style={{borderTop: "solid 1px #ccc", borderLeft: "none"}} />);
    const navlinks = navActive ? (
        <ul className={navclass}>
          {hr}
          <NavLink activeClassName="active" to="/login" onClick = {this.displayLogin} style={{color: "#0d63c9", fontWeight: "bold"}}>Login</NavLink>
          {hr}
          <NavLink activeClassName="active" to="/signup" onClick= {this.displaySignUp} style={{color: "#f04432", fontWeight: "bold"}}>Sign Up</NavLink>
          {hr}
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          {hr}
          <NavLink activeClassName="active" to="/rent">Properties</NavLink>
          {hr}
          <NavLink activeClassName="active" to="/dev">Developments</NavLink>
          {hr}
          <NavLink activeClassName="active" to="/com">Commercial</NavLink>
          {hr}
          <NavLink activeClassName="active" to="/calc">Calculators</NavLink>
          {hr}
          <NavLink activeClassName="active" to="/adv">Advice</NavLink>
          {hr}
          <NavLink activeClassName="active" to="/pri">List Privately</NavLink>
          {hr}
        </ul>
      )
      :
      (
        <ul className={navclass}>
          <NavLink activeClassName="active" to="/login" onClick = {this.displayLogin} style={{color: "#0d63c9", fontWeight: "bold"}}>Login</NavLink>
          <NavLink activeClassName="active" to="/signup" onClick= {this.displaySignUp} style={{color: "#f04432", fontWeight: "bold"}}>Sign Up</NavLink>
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/rent">Properties</NavLink>
          <NavLink activeClassName="active" to="/dev">Developments</NavLink>
          <NavLink activeClassName="active" to="/com">Commercial</NavLink>
          <NavLink activeClassName="active" to="/calc">Calculators</NavLink>
          <NavLink activeClassName="active" to="/adv">Advice</NavLink>
          <NavLink activeClassName="active" to="/pri">List Privately</NavLink>
        </ul>
      );
    this.setState({
      navActive, navlinks
    });
  }

  render () {
    return (
      <header>
        <nav className="navbar">
          <div>
            <a><img src={logo} alt="logo" /></a>
          </div>
          {this.state.navlinks}
          <div className="burger" onClick={this.navSlide}>
            <div className="line1"> </div>
            <div className="line2"> </div>
            <div className="line3"> </div>
          </div>
        </nav>
        <SignupLogin ref={this.signupLoginElement} />
      </header>
    )
  };
}
export default Navbar;
