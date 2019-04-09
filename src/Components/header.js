import React, { Component } from 'react';
import SecureKey from 'jsonwebtoken';

// CSS is imported
import { headerCSS } from '../todoCSS';
import { userToken$ } from './store';

class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }
  componentDidMount() {    
    let value;

    // Get token and decode it for display the userNae
    //let userToken = JSON.parse(getLSData);
        
        
        
    this.subscription = userToken$.subscribe((userToken) => {      
    console.log(userToken);
    if (userToken) {
      const userDecodedToken = SecureKey.decode(userToken);
      let userName = userDecodedToken.email;
      this.setState({ userName: userName });
      value = true;
      this.props.keepLogedIn(value);
    } 
    else {  
      this.setState({ username: "" });
      value = false;
      this.props.keepLogedIn(value);
    }
    });
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
}
  render() {
    return (
      <header>
        <p className={ headerCSS.pagesHeadLine }>Todolista</p>
        <section className={ headerCSS.inloggedUser }>
          {
            (this.props.logedIn === false)
            ? <p>Inte inloggad</p>
            : <p>{ this.state.userName } <button className={ headerCSS.logOutBtn } onClick={ this.props.logOut }>Logga ut</button></p>
          }
        </section>
        <p></p>
      </header>
    );
  }
}

export default Header;
