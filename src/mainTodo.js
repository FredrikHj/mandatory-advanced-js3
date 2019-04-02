import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import jwt from 'jsonwebtoken';

import TodoList from './todoLists';
import Header from './header';
import { Reg, Login } from './loginReg';


// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class TodoApp extends Component {
    constructor(props) {
      super(props);
      // Sett intialstate for the functions in the app. Group some of them together
      this.state = {
      redirect: true,
      logedIn: { value: false, mess: 'Inte inloggad', mail: '' },

    }
    this.logIn = this.logIn.bind(this);
    this.reg = this.reg.bind(this);
  }
  reg(e) {
    this.setState({
      logedIn: {
        ...this.state.logedIn,
        value: true
      }
    });


    e.preventDefault();
  }
  logIn(e) {
    this.setState({
      logedIn: {
        ...this.state.logedIn,
        value: true
      }});
      e.preventDefault();
  }

  render() {
    return (
      <>
        <div id="appBody">
        <Header
          logedIn={ this.state.logedIn }
        />
          <main>
            <hr/>
            <Router>
              <Route exact path="/" render={(props) => <Login {...props}
                  logIn={ this.logIn }
                  logedIn={ this.state.logedIn }
                />}
              />

            <Route exact path="/Reg" render={(props) => <Reg {...props}
                  logedIn={ this.state.logedIn }
                  submitReg={ this.submitReg }
                />}
              />
              <Route exact path="/List" component={TodoList}/>
            </Router>
          </main>
        </div>
      </>
    );

    if (this.state.redirect === true) return <Redirect to="/"/>;
  }
}

export default TodoApp;
