import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import SecureKey from 'jsonwebtoken';
import axios from 'axios';

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
      regInformation: { userName: '', userPwd: '', decodedToken: {} },
      logedIn: { value: false, userMail: 'Inte inloggad',  }

    }
    //this.userDecodedData = this.userDecodedData;
    this.urlApi = this.urlApi;
    this.logIn = this.logIn.bind(this);
    this.submitReg = this.submitReg.bind(this);
    this.userEmail = this.userEmail;
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPwd = this.onChangeUserPwd.bind(this);
  }
  componentDidMount() {
    this.urlApi = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    
    //  Check if localStorage is containing a user if yes the user will always be inlogged
    /*if (localStorage.getItem('name') !== 'undefined' && localStorage.getItem('name') !== null) {
      console.log(this.userDecodedData);
      
      this.setState({
        logedIn: { ...this.state.logedIn, value: true }
      });
      
    }*/
  }
  onChangeUserName(e) {
    let targetUserName = e.target.value;
    console.log(targetUserName);
    this.setState({
      regInformation: {
        ...this.state.regInformation,
        userName: targetUserName },
      logedIn: { ...this.state.logedIn, userMail: targetUserName}
    });
  }
  onChangeUserPwd(e) {
    let targetUserPwd = e.target.value;
    console.log(targetUserPwd);
    this.setState({
      regInformation: {
        ...this.state.regInformation,
        userPwd: targetUserPwd
      }
    });
  }
  submitReg(e) {
    // Is creating ha hidden and secure jwt for the user has ben registred
    let sendUserName = this.state.regInformation.userName;
    let sendUserPwd = this.state.regInformation.userPwd;

    console.log(sendUserName);
    console.log(sendUserPwd);
    axios.post(this.urlApi + '/register',
      {
        email: sendUserName,
        password: sendUserPwd
      }
    )
    .then(response => {
      if (response.status === 201) {
        this.setState({
          logedIn: {
            ...this.state.logedIn,
            value: true,
            userMail: this.response.data.email
          }
        });
      }
    })
    .catch((error) => {
      console.log(console.error);
    })
    console.log(this.state.logedIn);
    e.preventDefault();
  }
  logIn(e) {
    let getYorUserName = this.state.regInformation.userName;
    let getYorUserPwd = this.state.regInformation.userPwd;
    axios.post(this.urlApi + '/auth', {
      email: getYorUserName,
      password: getYorUserPwd
    })
    .then(response => {
      if (response.status === 200) {
        let userSecureJWT = response.data.token;
        var userDecodedData = SecureKey.decode(userSecureJWT);

        //fredde@mail.com 1234


        ---------------------
        // Store the userInlogg even when the browser is closed or refreshed
          
          let userDatatoJson = JSON.stringify(userDecodedData);
          localStorage.setItem(userDatatoJson);
        } 
        
        console.log(localStorage.setUser(userDecodedData));

        this.setState({
          logedIn: { ...this.state.logedIn, value: true }
        });
      })
    .catch((error) => {
      console.log(error);
    })
    e.preventDefault();
  }

  render() {
    console.log(window.localStorage.getItem('name'));
    
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
                  onChangeUserName={ this.onChangeUserName }
                  onChangeUserPwd={ this.onChangeUserPwd }
                  logedIn={ this.state.logedIn }
                />}
              />

            <Route exact path="/Reg" render={(props) => <Reg {...props}
                  logedIn={ this.state.logedIn }
                  onChangeUserName={ this.onChangeUserName }
                  onChangeUserPwd={ this.onChangeUserPwd }
                  submitReg={ this.submitReg }
                />}
              />
            <Route exact path="/List" render={(props) => <TodoList {...props}
                  onChangeUserName={ this.onChangeUserName }
                  onChangeUserPwd={ this.onChangeUserPwd }
                />}
              />
            </Router>
          </main>
        </div>
      </>
    );

    if (this.state.redirect === true) return <Redirect to="/"/>;
  }
}

export default TodoApp;
