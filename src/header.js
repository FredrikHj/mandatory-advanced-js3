import React, { Component } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function Header(props) {
  return (
    <>
    <header>
      <p id="pagesHeadLine">Todolista</p>
      <section id="inloggedUser">
        {
          (props.logedIn === false)
          ? <p>Inte inloggad</p>
          : <p>{ props.regUser } <button id="logOutBtn" onClick={ props.logOut }>Logga ut</button></p>
        }
      </section>
      <p></p>
    </header>
    </>
  );
}

export default Header;
