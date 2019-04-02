import React, { Component } from 'react';
import {Helmet} from "react-helmet";

function Header(props) {
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
          : <p>freddehboy@hotmail.com {/*props.logedIn.mail*/}</p>
        }
      </section>
      <p></p>
    </header>
    </>
  );
}

export default Header;
