import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../css/SignupLogin.css';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class SignupLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {email: "", password: "", confirm: "", display: null, context: null, firstname: "", lastname: "", pass: true, loginerror: null, login:null};
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleFirstname = this.handleFirstname.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
    this.close = this.close.bind(this);
    this.display = this.display.bind(this);
    this.switchContext = this.switchContext.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleFirstname(e) {
    this.setState({firstname: e.target.value});
  }

  handleLastname(e) {
    this.setState({lastnmae: e.target.value});
  }

  handleEmail(e) {
    this.setState({email: e.target.value});
  }

  handlePassword (e) {
    this.setState({password: e.target.value});
  }

  handleConfirmPassword(e) {
    this.setState({confirm: e.target.value})
  }

  close (e) {
    this.setState({display: false});
  }

  display(context) {
    this.setState({email: "", password: "", confirm: "", firstname: "", lastname: "", display: true, context: context});
  }

  handleSignupSubmit (e) {
    e.preventDefault();
    if (this.checkPassword()==null && (this.state.email.length>0&&this.checkEmail()==null)) {
      axios.post(`api/putUserData`, {
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname
      });
      setTimeout(() => {fetch(`api/getSingleUserData/${this.state.email}/${this.state.password}`)
        .then((data) => data.json())
        .then((res) => {
          if (res.data==null) {
            this.setState({loginerror: (<p id="pass">Incorrect email or password</p>)});
          }
          else {
            this.setState({loginerror: null, login: true})
          }
        });}, 3000);
    }
  }

  handleLoginSubmit (e) {
    e.preventDefault()
    if (this.state.email!=''&&this.state.password!='') {
      fetch(`api/getSingleUserData/${this.state.email}/${this.state.password}`)
        .then((data) => data.json())
        .then((res) => {
          if (res.data==null) {
            this.setState({loginerror: (<p id="pass">Incorrect email or password</p>)});
          }
          else {
            this.setState({loginerror: null, login: true})
          }
        });
      }
  }

  switchContext (context, e) {
    e.preventDefault();
    this.setState({context:context});
  }

  checkEmail() {
    if (this.state.email=="") return null;
    return this.state.email.indexOf("@")!=-1 ? null : (<h1 id="pass">Invalid Email</h1>);
  }

  checkPassword() {
    if (this.state.password=="" || this.state.confirm=="") {return null;}
    if (this.state.password.length<6) return (<h1 id="pass">Password is too short!</h1>);
    else if (this.state.password==this.state.confirm) {return null;}
    else return (<h1 id="pass">Passwords do not match!</h1>);
  }

  render () {
    if (this.state.login) {
      return (<Redirect to='/rent' />);
    }
    if (this.state.display) {
      let header1; let header2; let submit; let footer; let form;
      if (this.state.context=="signup") {
        header1 = (<span><a onClick={(e) => {this.switchContext("login", e)}}>Login</a></span>);
        header2 = (<span><a onClick={(e) => {this.switchContext("signup", e)}} id="signup">Sign Up</a></span>);
        submit = (<button onClick={this.handleSignupSubmit}> Register </button>);
        footer = (<button onClick={(e) => {this.switchContext("login", e)}} id="footer"> I already have an account </button>);
        form=(<form action="/rent" onSubmit={this.handleSignupSubmit}>
              <input type="text" placeholder="Email" onChange={this.handleEmail}/>
              {this.checkEmail()}
              <input type="text" placeholder="First name" onChange={this.handleFirstname} />
              <input type="text" placeholder="Last name" onChange={this.handleLastname} />
              <input type="password" placeholder="Password" onChange={this.handlePassword} />
              <input type="password" placeholder="Confirm Password" onChange={this.handleConfirmPassword}/>
              {this.checkPassword()}
              {submit}
            </form>);
      }
      else {
        header1 = (<span><a onClick={(e) => {this.switchContext("login", e)}} id="login">Login</a></span>);
        header2 = (<span><a onClick={(e) => {this.switchContext("signup", e)}}>Sign Up</a></span>)
        submit = (<button onClick={this.handleLoginSubmit}> Login </button>)
        footer = (<button onClick={(e) => {this.switchContext("signup", e)}} id="footer"> I don't have an account </button>);
        form=(<form action="/rent" onSubmit={this.handleLoginSubmit}>
              <input type="text" placeholder="Email" onChange={this.handleEmail}/>
              {this.checkEmail()}
              <input type="password" placeholder="Password" onChange={this.handlePassword}/>
              {submit}
              {this.state.loginerror}
            </form>);
      }
      return (
        <div className="background">
          <div className = "popup">
            <div className ="header">
              {header1}
              {header2}
              <span id = "closeX">
                <a onClick={this.close}><CloseIcon /></a>
              </span>
            </div>
            <hr />
              {form}
            <hr />
            {footer}
          </div>
        </div>
      )
    }
    else {
      return (null);
    }
  }
}

export default (SignupLogin);
