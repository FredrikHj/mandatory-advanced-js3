import React, { Component } from 'react';
import {Helmet} from "react-helmet";

// CSS is imported
import { headerCSS } from './todoCSS';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function Header(props) {
  return (
    <>
    <header>
      <p className={ headerCSS.pagesHeadLine }>Todolista</p>
      <section className={ headerCSS.inloggedUser }>
        {
          (props.logedIn === false)
          ? <p>Inte inloggad</p>
          : <p>{ props.regUser } <button className={ headerCSS.logOutBtn } onClick={ props.logOut }>Logga ut</button></p>
        }
      </section>
      <p></p>
    </header>
    </>
  );
}

export default Header;
