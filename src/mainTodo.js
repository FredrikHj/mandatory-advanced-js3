import React, { Component } from 'react';
import SecureKey from 'jsonwebtoken';
import axios from 'axios';

import TodoList from './todoLists';
import Header from './header';
import { Reg, Login } from './loginReg';

// CSS is imported
import { mainWindowCSS } from './todoCSS';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class TodoApp extends Component {
    constructor(props) {
      super(props);
      // Sett intialstate for the functions in the app. Group some of them together
      this.state = {
        redirect: true,
        regInformation: { userName: '', token: '', validRegInfo: true, errorMess: ''},
        userValid: { value: true, errorMess: '' },
        logedIn: false
      }
    //this.userDecodedData = this.userDecodedData;
    this.urlApi = this.urlApi;
    //this.getUserData = this.getUserData;
    this.logIn = this.logIn.bind(this);
    this.submitReg = this.submitReg.bind(this);
    this.userEmail = this.userEmail;
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPwd = this.onChangeUserPwd.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    this.urlApi = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
          
    let getParsedUserStoredData = JSON.parse(localStorage.getItem('userDataToJson'));
    console.log(getParsedUserStoredData);    

    //  Check if localStorage is containing a user if yes the user will always be inlogged
     if (localStorage.getItem('userDataToJson') !== 'undefined' && localStorage.getItem('userDataToJson') !== null) {
      //let getParsedUserStoredData = JSON.parse(localStorage.getItem('userDataToJson'));


      
      this.setState({
        logedIn: true,
        regInformation: { 
          userName: getParsedUserStoredData.email,
          token: getParsedUserStoredData.token}
      });     
    }
  }
  onChangeUserName(e) {
    let targetUserName = e.target.value;
    console.log(targetUserName);
    this.setState({
      regInformation: {
        ...this.state.regInformation,
        userName: targetUserName }
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
          redirect: true
        });
      }
    })
    .catch((error) => {
      let errorData = error.response;
      let validMess = errorData.data.message;      
      
      /* String clean up -> turn str into array, one word is one index --> remove index 0 ---> loop through the array into a string sentence againg.
         Last turn the first letter to a bigg one */
      let typeOfValidMess = errorData.data.details[0].message
      let errorStrCleanUp = typeOfValidMess.split(' ');
      errorStrCleanUp.shift();

      let arrForDisplayWords = [];
      let newErrorMess = '';
      for (let errorStrCleanUpEachWord of errorStrCleanUp) {
        arrForDisplayWords.push(errorStrCleanUpEachWord);
        newErrorMess = arrForDisplayWords.join(' ');
      }
      let typeOfValidMessCorr = newErrorMess.charAt(0).toUpperCase() + newErrorMess.slice(1)
      // ========================================================================================================================================= 
      if ( errorData.status === 400 || errorData.status === 401) {
        this.setState({
          regInformation: {
            ...this.state.regInformation,
            validRegInfo: false,
            errorMess: errorData.data.message + ': ' + typeOfValidMessCorr
          }
        }); 
      }
    })
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

        // Get the userName for the header
        let userDecodedData = SecureKey.decode(userSecureJWT);
        let userName = userDecodedData.email;
        let inlogedUserInfo = { email: userName, token: userSecureJWT };


        // Store the userInlogg even when the browser is closed or refreshed
        localStorage.setItem('userDataToJson', JSON.stringify(inlogedUserInfo));
        
         this.setState({
          redirect: false,
          logedIn: true
        });
      }
    })  
    .catch((error) => {
      let errorData = error.response
      console.log(errorData.data.message);
      
      if (errorData.status === 400 || errorData.status === 401) {
        this.setState({
          userValid: { value: false, errorMess: errorData.data.message }
        });      
      }

    })
    console.log('Du är inloggad :)');
    
    e.preventDefault();
  }
  logOut() {
    localStorage.clear('userDataToJson');

    this.setState({
       logedIn: false,
       userValid: { value: true, errorMess: '' }
    });
    console.log('Du är utloggad :)');
  }
  render() {
    return (
      <>
        <div className={ mainWindowCSS.appBody }>
        <Header
          regUser={ this.state.regInformation.userName }
          logedIn={ this.state.logedIn }
          logOut={ this.logOut }
        />
          <main>
            <hr className={ mainWindowCSS.hr }/>
            <Router>
              <Route exact path="/" render={(props) => <Login {...props}
                  logIn={ this.logIn }
                  onChangeUserName={ this.onChangeUserName }
                  onChangeUserPwd={ this.onChangeUserPwd }
                  logedIn={ this.state.logedIn }
                  userValid={ this.state.userValid }
                />}
              />

            <Route exact path="/Reg" render={(props) => <Reg {...props}
                  logedIn={ this.state.logedIn }
                  onChangeUserName={ this.onChangeUserName }
                  onChangeUserPwd={ this.onChangeUserPwd }
                  submitReg={ this.submitReg }
                  errorData={ this.state.regInformation }
                />}
              />
            <Route exact path="/Lista" render={(props) => <TodoList {...props}
                  onChangeUserName={ this.onChangeUserName }
                  onChangeUserPwd={ this.onChangeUserPwd }
                  logedIn={ this.state.logedIn }
                  userToken={ this.state.regInformation.token }
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
