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
    this.itemCounter = this.itemCounter;
    this.addTodo = this.addTodo;
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitList = this.submitList.bind(this);

  }
  componentDidMount() {
    this.urlApi = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    this.itemCounter = 0;
    axios.post(this.urlApi, + '/todos', {
      headers: {
        Authorization:  'Barer' + this.props.token }
    })
    .then(response => {
      console.log(response);
      
    })
    .catch(error => {


    });
    this.addTodo = [];


  }
  addItem(e) {
    // Add a input string into my array to be displayed i the list
    let getInputStr = e.target.value;
    let getKeyDown = e.key;
    let getItemIntoList = getInputStr;

    //React according the key Enter
    if(getKeyDown === 'Enter'){
      this.itemCounter += 1;
      let addTodoItem = <AddTodo 
  
      itemCounter={ this.itemCounter }
      getItemIntoList={ getItemIntoList }/>;
      this.setState({
        todoItem: [
          ...this.state.todoItem,
          this.addTodo.push(addTodoItem)
        ]
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
                  { this.addTodo }
                </form><br/>
              </section>
            </>
        }
      </>
    );
  }
}

export default TodoList;
