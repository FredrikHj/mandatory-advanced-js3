import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
let itemCounter = 0;

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: []
    }
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitList = this.submitList.bind(this);
    
  }
  componentDidMount() {
    let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
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
      let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
      axios.post(API_ROOT + '/todos', {
        content: getInputStr }, {
          headers: {
            Authorization: 'Bearer ' + this.props.userToken }
          }
          ).then(response => {
            console.log(response);
            
          }).catch(error => {
          });
        }
      } 
  removeItem(e) {
    let targetRemoveBtn = e.target.value;
    console.log(targetRemoveBtn);
    let API_ROOT = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";
    axios.delete(API_ROOT + '/todos/' + targetRemoveBtn, {
      headers: {
        Authorization: 'Bearer ' + this.props.userToken }
      }).then(resonse => {
      console.log(resonse);
      

    })

    let newMTodoList = [...this.state.todoItem.slice(0, targetRemoveBtn), ...this.state.todoItem.slice(targetRemoveBtn + 1)
    ];

    this.setState({ targetRemoveBtn: newMTodoList});

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
    let renderTodos = this.state.todoItem;
    console.log(renderTodos);
    
    //showItem(insurtetItem);
    console.log(this.props.userToken);

    
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
          (renderTodos.length === 0)
          ? <p id="noneItem">Inget att visa !!!</p>
          : <>
              <section className="itemFrame">
                <form>
                  { 
                    renderTodos.map((obj) => {
                      console.log(obj);
                      itemCounter += 1;
                      return (
                        <section className="itemContainer" key={ itemCounter }>
                          { itemCounter + '.)'}<span className="lineAddItem">-</span>
                          <span className="todoItem">{ obj.content.charAt(0).toUpperCase() + obj.content.slice(1) }</span>
                          <button className="removeTodo" value={ obj.id } onClick={ this.removeItem }>X</button>
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
