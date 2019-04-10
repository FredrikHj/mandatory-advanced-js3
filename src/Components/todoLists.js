import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';
import { userToken$, updateCurrentPage } from './store';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// CSS is imported
import { todoListCSS } from '../todoCSS';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: [],
      userToken: ''
    }
    this.apiUrl = this.apiUrl;
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitList = this.submitList.bind(this);   
    this.runTodoList = this.runTodoList.bind(this);
  }
  componentDidMount() {
    console.log('Run list');
    
    this.apiUrl = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    let API_ROOT = this.apiUrl;
    // Get the token and check it for changes
    this.subscription = userToken$.subscribe((userToken) => {
      if (userToken) {
        console.log('Lyssna och sätter token');
        this.setState({ userToken: userToken$.value });
      } else {  
        this.setState({ userToken: '' });
      }
    });
    this.runTodoList();
  }
    runTodoList() {
      this.itemCounter = 0;
      let API_ROOT = this.apiUrl;
      axios.get(API_ROOT + '/todos', {
        headers: { Authorization: 'Bearer ' + userToken$.value }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            todoItem: response.data.todos
          });
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
      
    }
  addItem(e) {
    // Add a input string into my array to be displayed i the list
    let getInputStr = e.target.value;
    let getKeyDown = e.key;
    console.log(getInputStr);
    
    //React according the key Enter
    if(getKeyDown === 'Enter'){      
      /* Send the inputed item into the component which has the content and structure of the item to be displayed later fo the user.
      The component will be send to the server and the server is send the todo list back. */
      let API_ROOT = this.apiUrl;
      axios.post(API_ROOT + '/todos', {
        content: getInputStr }, { headers: { Authorization: 'Bearer ' + userToken$.value }
      }).then(response => {
        console.log(response);
        this.setState({ todoItem: [ 
          ...this.state.todoItem,
          response.data.todo ]
        });           
      }).catch(error => {
      });
    }
    console.log(this.state.todoItem);
    
  } 
  removeItem(e) {
    let targetRemoveBtnIndex = parseInt(e.target.value);
    console.log(targetRemoveBtnIndex);
    let targetRemoveBtnId = e.target.id;
    console.log(typeof targetRemoveBtnIndex);
    
    let API_ROOT = this.apiUrl;
    axios.delete(API_ROOT + '/todos/' + targetRemoveBtnId, {
      headers: { Authorization: 'Bearer ' + userToken$.value }
    }).then(response => {
      console.log(response);
      let newMTodoList = [...this.state.todoItem.slice(0, targetRemoveBtnIndex), ...this.state.todoItem.slice(targetRemoveBtnIndex + 1)];
      
      this.setState({ todoItem: newMTodoList });      
    })
    
    
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
    updateCurrentPage(' ');
    console.log(this.state.todoItem);
    
    let itemCounter = -1;
    let todoNr = 0;
    let renderTodos = this.state.todoItem;
    
    if (this.props.logedIn === false) return <Redirect to="/"/>;
    return (
      <>
       <Helmet>
          <meta charSet="utf-8" />
          <title>Todolista</title>
      </Helmet>
        <section className={ todoListCSS.todoListHead }>
          <p className={ todoListCSS.todoHeadline }>Att göra </p>
          <input type="text" className={ todoListCSS.typeTodoItem } onKeyPress={ this.addItem }/>
        </section>
        {
          (renderTodos.length === 0)
          ? <p className={ todoListCSS.noneItem }>Ingen data att visa men det kanske kommer?
           <br/><br/>Spänningen är olidlig ;)</p>
          : <>
              <section className={ todoListCSS.itemFram }>
                <form>
                  { 
                    renderTodos.map((obj) => {
                      console.log(obj);
                      itemCounter += 1;
                      todoNr += 1;
                      return (
                        <section className={ todoListCSS.itemContainer } key={ itemCounter }>
                          <div className={ todoListCSS.listTable }>
                            <div className={ todoListCSS.todoTNr }>{todoNr + '.)'}</div>
                            <span className={ todoListCSS.lineAddItem }>-</span>
                            <div className={ todoListCSS.todoItem }><span>{ obj.content.charAt(0).toUpperCase() + obj.content.slice(1) }</span></div>
                            <div className={ todoListCSS.removeTodo }><button id={ obj.id } value={ itemCounter } onClick={ this.removeItem }>X</button></div>
                          </div>
                        </section>
                      );
                    })
                  }
                </form><br/>
              </section>
            </>
        }
      </>
    );
  }
}

export default TodoList;
