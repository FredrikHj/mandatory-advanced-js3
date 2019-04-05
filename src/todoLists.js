import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';


// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

function AddTodo(props) {
  return (
    <section className="itemContainer" key={ props.itemCounter } >
      { props.itemCounter } .)<span className="lineAddItem">-</span>
      <input type="text" className="todoItem" value={ props.getItemIntoList }/>
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
    this.urlApi = this.urlApi;
    this.urlApiTodoStr =this.urlApiTodoStr;
    this.itemCounter = this.itemCounter;
    this.addTodo = this.addTodo;
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitList = this.submitList.bind(this);

  }
  componentDidMount() {
    this.urlApi = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    this.urlApiTodoStr = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000/todos'; 
    console.log(this.props.userToken);
    this.itemCounter = 0;
    axios.get(this.urlApi, + '/todos', {
      headers: {
        Authorization: 'Bearer' + this.props.userToken.value }
    })
    .then(response => {
      console.log(response);
      this.setState({
          todoItem: response.data
        });
    })
    .catch(error => {


    });
  }
  addItem(e) {
    // Add a input string into my array to be displayed i the list
    let getInputStr = e.target.value;
    let getKeyDown = e.key;
    let getItemIntoList = getInputStr;

    //React according the key Enter
    if(getKeyDown === 'Enter'){
      console.log(this.urlApi);
            
      this.itemCounter += 1;
      /* Send the inputed item into the component which has the content and structure of the item to be displayed later fo the user.
         The component will be send to the server and the server is send the todo list back. */
      let addTodoItem = <AddTodo itemCounter={ this.itemCounter } getItemIntoList={ getItemIntoList }/>;
      
      axios.post(this.urlApiTodoStr, {
        content: 'dsv' }, {
          headers: {
            Authorization: 'Bearer' + this.props.userToken.value }
        }
      ).then(response => {
        console.log(response);
        
      }).catch(error => {
      });
    }
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
    console.log(this.props.userToken);
    console.log(this.state.todoItem);
    
    if (this.props.logedIn === false) return <Redirect to="/"/>;
      console.log('Listan');
      
      console.log(this.addTodo);
    return (
      <>
       <Helmet>
          <meta charSet="utf-8" />
          <title>Todolista</title>
      </Helmet>
        <section id="todoListHead">
          <p id="todoHeadline">Att göra </p>
          {/*//<button id="addTodoItem" onClick={ this.addItem }>Lägga till</button>*/}
          <input type="text" id="typeTodoItem" onKeyPress={ this.addItem }/>
        </section>
        {
          (this.addTodo ===  undefined || this.addTodo.length === 0)
          ? <p id="noneItem">Inget att visa !!!</p>
          : <>
              <section className="itemFrame">
              <form>
                  { this.state.addItem }
                </form><br/>
              </section>
            </>
        }
      </>
    );
  }
}

export default TodoList;
