import React, { Component } from 'react';
import axios from 'axios';

import Header from './Components/header';
import { Reg, Login } from './Components/loginReg';
import TodoList from './Components/todoLists';
import { updateToken } from './Components/store';


// CSS is imported
import { mainWindowCSS } from './todoCSS';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class TodoApp extends Component {
    constructor(props) {
      super(props);
      // Sett intialstate for the functions in the app. Group some of them together
      this.state = {
        redirect: true,
        regInformation: { userName: '', token: '', validRegInfo: true, errorMess: ''},
        userIsCreated: { value: false, mess: '' },
        userValid: { value: true, errorMess: '' },
        logedIn: false
      }

    this.urlApi = this.urlApi;
    this.logIn = this.logIn.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
    this.keepLogedIn = this.keepLogedIn.bind(this);
    this.submitReg = this.submitReg.bind(this);
    this.userEmail = this.userEmail;
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeUserPwd = this.onChangeUserPwd.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
    this.urlApi = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';;     
  }
  onChangeUserName(e) {
    let targetUserName = e.target.value;
    this.setState({
      regInformation: {
        ...this.state.regInformation,
        userName: targetUserName }
    });
  }
  onChangeUserPwd(e) {
    let targetUserPwd = e.target.value;
    this.setState({
      regInformation: {
        ...this.state.regInformation,
        userPwd: targetUserPwd
      }
    });
  }
  submitReg(e) {
    let sendUserName = this.state.regInformation.userName;
    let sendUserPwd = this.state.regInformation.userPwd;
    axios.post(this.urlApi + '/register',
      {
        email: sendUserName,
        password: sendUserPwd
      }
    )
    .then(response => {
      if (response.status === 201) {
        let userCreated = response.data.email + ' - ' + response.statusText + ' :)';
        this.setState({
          userIsCreated: { value: true, mess: userCreated },
          //redirect: true
        });
      }
    })
    .catch((error) => {
      console.log(error);
      let typeOfValidMess, chosenErrorMess;
      let errorData = error.response;
      let validMess = errorData.data.message;
     
     // Check for the key details[0] and choose the corr path
     if ('details' in errorData.data ) {
      typeOfValidMess = errorData.data.details[0].message;
      chosenErrorMess = errorData.data.message + ': ' + typeOfValidMessCorr;
     } 
     else {
      typeOfValidMess = errorData.data.message;
      chosenErrorMess = errorData.data.message;
     }
      
      /* String clean up -> turn str into array, one word is one index --> remove index 0 ---> loop through the array into a string sentence againg.
         Last turn the first letter to a bigg one */
      
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
            errorMess: chosenErrorMess
          }
        }); 
      }
    })
    e.preventDefault();
  }
  backToLogin() {
    console.log('ef');
    
    this.setState({ 
      userValid: {
        ...this.state.userValid, 
        value: true
      },
      regInformation: {
        ...this.state.regInformation,
        validRegInfo: true,
        errorMess: ''
      }

    }); 
  }
  logIn(e) {
    let getYorUserName = this.state.regInformation.userName;
    let getYorUserPwd = this.state.regInformation.userPwd;
    axios.post(this.urlApi + '/auth', {
      email: getYorUserName,
      password: getYorUserPwd
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        console.log('Then - login');
        
        // Get the userName for the header. Save the token in localStorage and sent it to store.js.
        let userTokenFromServer = response.data.token;
        console.log(userTokenFromServer);
        
        updateToken(userTokenFromServer);
        window.localStorage.setItem('userToken', userTokenFromServer);
        
        this.setState({
         redirect: false,
         logedIn: true
        });

      }
    })  
    .catch((error) => {
      let errorData = error.response;
      console.log(errorData);
      
      if (errorData.status === 400 || errorData.status === 401) {
        console.log('Catch - login');
       
        this.setState({
          userValid: { value: false, errorMess: errorData.data.message }
        });   
      }
    })
    console.log('Du är inloggad :)');
    
    e.preventDefault();
  }
  /* A callback is receiving a value true or false that will trigger the user
   to be inlogged untill the user is logout itself :) */
  keepLogedIn(value) {
    this.setState({logedIn: value});
  }
  logOut() {
    window.localStorage.clear('userToken');

    this.setState({
       logedIn: false,
       userValid: { value: true, errorMess: '' }
    });
    console.log('Du är utloggad :)');
  }
  render() {
    console.log(this.state.regInformation );
    
    return (
      <>
        <div className={ mainWindowCSS.appBody }>
        <Header
          regUser={ this.state.regInformation.userName }
          logedIn={ this.state.logedIn }
          keepLogedIn={ this.keepLogedIn }
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
                  backToLogin={ this.backToLogin }
                  userValid={ this.state.userValid }
                  userIsCreated={ this.state.userIsCreated }
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
