import React, { Component } from 'react';

// CSS is imported
import { headerCSS } from '../todoCSS';
import { userName$ } from './store';

class Header extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
  }
  componentDidMount() {
    console.log('header');
    
    let value;
    this.subscription = userName$.subscribe((userName) => {      
      if (userName) {
        console.log('Namn');
        this.setState({ userName: userName$.value });
        value = true;
        this.props.keepLogedIn(value);
      } else {  
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
    console.log(this.props);
    console.log(userName$.value);
    console.log(this.state.userName);
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
