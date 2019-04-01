import React, { Component } from 'react';
import {Helmet} from "react-helmet";

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

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
    </header>
    </>
  );
}
function Reg(props) {
  console.log(props);
  if (props.logedIn.value === true) return <Redirect to="/List"/>;
  return (
    <>
      <div id="loginContainer">
        <form>
          <label htmlFor="regUserName">Användarnamn <br/>
            <input type="text" id="regUserName" //onChange={ this.addMovie }
            />
          </label>
          <label htmlFor="regPwd">Lösenord <br/>
              <input type="text" id="regPwd" //onChange={ this.addMovie }
            />
          </label><br/>
        </form>
      </div>
      <button id="regBtn" onClick={ props.submitReg }>Registrera!</button>
    </>
  );
}
function Login(props) {
  console.log(props);
  if (props.logedIn.value === true) return <Redirect to="/List"/>;
  return (
    <>
      <form>
        <div id="loginContainer">
          <label htmlFor="loginUserName">Användarnamn <br/>
            <input type="text" id="loginUserName" //onChange={ this.addMovie }
            />
          </label>
          <label htmlFor="loginPwd">Lösenord <span id="errorMess"> Användaren finns inte!</span><br/>
            <input type="text" id="loginPwd" //onChange={ this.addMovie }
            />
          </label><br/>
        </div>
        < input type="submit" id="logInBtn" onClick={ props.logIn } value="Logga In" />
      </form>
      <Link id="regText" to="/Reg" onClick={ props.reg }>Registrera dig!</Link>
    </>
  );
}
function AddTodo(props) {
  return (
    <section className="itemContainer">
      <input type="text" className="todoItem"/>
      <button className="removeTodoItem">X</button>
    </section>
  );
}
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: []
    }
    this.addTodo = this.addTodo;
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitList = this.submitList.bind(this);

  }
  componentDidMount() {
    this.addTodo = [];
  }
  addItem() {
    let addTodoItem = <AddTodo/>;
    console.log('Lägg till');
    this.setState({
      todoItem: [
        ...this.state.todoItem,
        this.addTodo.push(addTodoItem)
      ]
    });
  }
  removeItem(e) {
    console.log();
    e.preventDefault();
  }
  submitList(e) {
    this.setState({
      logedIn: {
        ...this.state.logedIn,
        value: true
      }
    });
    e.preventDefault();
  }
  render() {
    console.log(this.addTodo);

    return (
      <>
        <section id="todoListHead">
          <p id="todoHeadline">Att göra </p>
          <button id="addTodoItem" onClick={ this.addItem }>Lägga till</button>
        </section>
        {(this.addTodo ===  undefined || this.addTodo === 0)
          ? <p id="noneItem">Inget att visa !!!</p>
          : <>
              <section className="itemFrame">
                <form>
                  { this.addTodo }
                </form><br/>
              </section>
              <hr className="middleLineTodoItem"/>
              <button className="submitListBtn">Sänd listan</button>
            </>
        }
      </>
    );
  }
}


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
