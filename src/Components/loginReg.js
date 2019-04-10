import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { updateCurrentPage } from './store';

// CSS is imported
import { regCSS, loginCSS } from '../todoCSS';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export class Reg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    updateCurrentPage(' - Registrering');
    let incommingErrorState = this.props.errorData.errorMess;
    console.log(incommingErrorState);
    
    let incommingCreatedState = this.props.userIsCreated; // Contains the created mess
      console.log(incommingCreatedState);
      
    //if ( this.props.userValid.value === true) return <Redirect to="/"/>;
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
          <span className={ regCSS.errorRegMess } style={(this.props.errorData.validRegInfo === false) 
          ? {display: 'inline-block'} : {display: 'none'}}>{ incommingErrorState }</span>
          <span className={ regCSS.errorRegMess } style={(incommingCreatedState.value === true)
          ? {display: 'inline-block'} : {display: 'none'}}>{ incommingCreatedState.mess }</span>
        </section>
        <button className={ regCSS.redToLogin }
        onClick={ this.props.backToLogin }><Link to="/">iLogga In Sida</Link></button>
      </>
    );
    
  }
}

export function Login(props) {  
  updateCurrentPage(' - Login');
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
        </section>
          <Link className={ loginCSS.regText } to="/Reg">Registrera dig?</Link>
      </form>
      <input type="submit" className={ loginCSS.logInBtn } onClick={ props.logIn } value="Logga In" />
    </>
  );
}

export default {
  Reg,
  Login,
}
