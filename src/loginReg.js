import React, { Component } from 'react';
import {Helmet} from "react-helmet";
// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export function Reg(props) {
  console.log(props);
  if (props.logedIn.value === true) return <Redirect to="/List"/>;
  return (
    <>
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
  console.log(props);
  if (props.logedIn.value === true) return <Redirect to="/List"/>;
  return (
    <>
      <form>
        <div id="loginContainer">
          <label htmlFor="loginUserName">Användarnamn <br/>
            <input type="text" id="loginUserName" onChange={ props.onChangeUserName }
            />
          </label>
          <label htmlFor="loginPwd">Lösenord <span id="errorMess"> Användaren finns inte!</span><br/>
            <input type="text" id="loginPwd" onChange={ props.onChangeUserPwd }
            />
          </label><br/>
        </div>
        < input type="submit" id="logInBtn" onClick={ props.logIn } value="Logga In" />
      </form>
      <Link id="regText" to="/Reg" onClick={ props.reg }>Registrera dig!</Link>
    </>
  );
}

export default {
  Reg,
  Login,
}
