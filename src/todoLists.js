import React, { Component } from 'react';
import {Helmet} from "react-helmet";

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

export default TodoList;
