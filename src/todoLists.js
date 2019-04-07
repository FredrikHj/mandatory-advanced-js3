import React, { Component, PureComponent } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

// CSS is imported
import { todoListCSS } from './todoCSS';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class TodoList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: []
    }
    this.apiUrl = this.apiUrl;
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitList = this.submitList.bind(this);
    
  }
  componentDidMount() {
    this.apiUrl = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';
    let API_ROOT = this.apiUrl;
    console.log(this.props.userToken);
    this.itemCounter = 0;
    axios.get(API_ROOT + '/todos', {
      headers: { Authorization: 'Bearer ' + this.props.userToken }
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
        content: getInputStr }, { headers: { Authorization: 'Bearer ' + this.props.userToken }
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
    let API_ROOT = this.apiUrl;
    axios.delete(API_ROOT + '/todos/' + targetRemoveBtnId, {
      headers: { Authorization: 'Bearer ' + this.props.userToken }
    }).then(response => {
      console.log(response);
      
      
    })
    
    let newMTodoList = [...this.state.todoItem.slice(0, targetRemoveBtnIndex), ...this.state.todoItem.slice(targetRemoveBtnIndex + 1)
    ];
    
    this.setState({ todoItem: newMTodoList});
    
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
    console.log('todoLists');
    let itemCounter = -1;
    let todoNr = 0;
    let renderTodos = this.state.todoItem;
    console.log(renderTodos);
    
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
          ? <p className={ todoListCSS.noneItem }>Inget att visa !!!</p>
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
                            <div className={ todoListCSS.removeTodo }><button id={ obj.id } value={ obj.id } onClick={ this.removeItem }>X</button></div>
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
