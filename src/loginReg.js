import React, { Component } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export function Reg(props) {
  console.log(props);
  if (props.logedIn.value === true) return <Redirect to="/List"/>;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Todo - Reg</title>
      </Helmet>
      <form onSubmit={ props.submitReg }>
        <div id="regContainer">
            <label htmlFor="regUserName">Användarnamn <br/>
              <input type="text" id="regUserName" onChange={ props.onChangeUserName }
              />
            </label>
            <label htmlFor="regPwd">Lösenord <br/>
                <input type="text" id="regPwd" onChange={ props.onChangeUserPwd }
              />
            </label><br/>
          </div>
      </form>
        <button id="regBtn" onClick={ props.submitReg }>Registrera!</button>
    </>
  );
}

export function Login(props) {
  console.log();
  console.log(props);
  if (props.logedIn === true) return <Redirect to="/Lista"/>;
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Todo - Login</title>
    </Helmet>
      <form>
        
        <div id="loginContainer">
          <label htmlFor="loginUserName">Användarnamn <br/>
            <input type="text" id="loginUserName" onChange={ props.onChangeUserName }
            />
          </label>
          <label htmlFor="loginPwd">Lösenord <br/> 
            <input type="text" id="loginPwd" onChange={ props.onChangeUserPwd }
            />
          </label><br/>
        </div>
        <section id="errorRegContainer" style={(props.userValid.value === false) ? {display: 'block'} : {display: 'none'}}>
          <p id="errorMess" >{ props.userValid.errorMess }</p>
          <Link id="regText" to="/Reg" onClick={ props.reg }>Registrera dig?</Link>
        </section>
      </form>
      <input type="submit" id="logInBtn" onClick={ props.logIn } value="Logga In" />
    </>
  );
}

export default {
  Reg,
  Login,
}
