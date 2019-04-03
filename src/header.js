import React, { Component } from 'react';
import {Helmet} from "react-helmet";

function Header(props) {
  console.log(props);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Todo</title>
      </Helmet>
    <header>
      <p id="pagesHeadLine">Todolista</p>
      <section id="inloggedUser">
        {
          (props.logedIn.value === false)
          ? <p>Inte inloggad</p>
          : <p>{ props.logedIn.userMail }</p>
        }
      </section>
      <p></p>
    </header>
    </>
  );
}

export default Header;
