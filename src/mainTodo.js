import React, { Component } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
//import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function Login(props) {
  return (
    <div id="loginContainer">
      <label htmlFor="regUserName">Användarnamn <br/>
        <input type="text" id="regUserName" //onChange={ this.addMovie }
        />
      </label><br/>
      <label htmlFor="regPwd">Lösenord <br/>
        <input type="text" id="regPwd" //onChange={ this.addMovie }
        />
      </label><br/>
    </div>
  );
}
function Header(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Todo - { props.logedIn.mess }</title>
      </Helmet>
      <header>
        <p id="pagesHeadLine">Todo - { props.logedIn.mess }
          <span id="inloggedUser">
            Användare: { props.logedIn.mail }
          </span>
        </p>
      </header>
    </>
  );
}
class TodoApp extends Component {
  constructor(props) {
  super(props);
  // Sett intialstate for the functions in the app. Group some of them together
  this.state = {
    logedIn: { value: false, mess: 'Inte inloggad', mail: '' }
  }
}
  render() {
    return (
      <>
        <div id="appBody">
        <Header
          logedIn={this.state.logedIn }
        />
          <main>
            <Login/>
          </main>
        </div>
      </>
    );
  }
}

export default TodoApp;
