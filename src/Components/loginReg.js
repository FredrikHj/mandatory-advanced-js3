import React, { Component } from 'react';
import {Helmet} from "react-helmet";

// CSS is imported
import { regCSS, loginCSS } from '../todoCSS';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
    }

  }

  render() {
    let incommingerrorState = this.props.errorData.errorMess;
    let errorMess = 'User with that email address exists';
    console.log(this.props.userValid );
    
    if ( this.props.userValid.value === true) return <Redirect to="/"/>;
    
      return (
        <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Todo - Reg</title>
        </Helmet>
        <form onSubmit={ this.props.submitReg }>
          <div className={ regCSS.regContainer }>
              <label htmlFor="regUserName">Användarnamn <br/>
                <input type="text" id="regUserName" onChange={ this.props.onChangeUserName }
                />
              </label>
              <label htmlFor="regPwd">Lösenord <br/>
                  <input type="text" id="regPwd" onChange={ this.props.onChangeUserPwd }
                />
              </label><br/>
            </div>
        </form>
        <section className={ regCSS.errorRegContainer }>
          <button className={ regCSS.regBtn } onClick={ this.props.submitReg }>Registrera!</button>
          <span className={ regCSS.errorRegMess } style={(this.props.errorData.validRegInfo === false) ? {display: 'inline-block'} : {display: 'none'}}>{ incommingerrorState }</span>
        </section>
        <button className={ regCSS.redToLogin } style={(incommingerrorState === errorMess) ? {display: 'block'} : {display: 'none'}}
        onClick={ this.props.backToLogin }>Logga In Sida</button>
      </>
    );
    
  }
}

export function Login(props) {
  if (props.logedIn === true) return <Redirect to="/Lista"/>;
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Todo - Login</title>
    </Helmet>
      <form>
        
        <div className={ loginCSS.loginContainer }>
          <label htmlFor="loginUserName">Användarnamn <br/>
            <input type="text" id="loginUserName" onChange={ props.onChangeUserName }
            />
          </label>
          <label htmlFor="loginPwd">Lösenord <br/> 
            <input type="text" id="loginPwd" onChange={ props.onChangeUserPwd }
            />
          </label><br/>
        </div>
        <section className={ loginCSS.errorLoginContainer } style={(props.userValid.value === false)
        ? {display: 'block'} : {display: 'none'}}>
          <p className={ loginCSS.errorLoginMess }>{ props.userValid.errorMess }</p>
          <Link className={ loginCSS.regText } to="/Reg" onClick={ props.reg }>Registrera dig?</Link>
        </section>
      </form>
      <input type="submit" className={ loginCSS.logInBtn } onClick={ props.logIn } value="Logga In" />
    </>
  );
}

export default {
  Reg,
  Login,
}
