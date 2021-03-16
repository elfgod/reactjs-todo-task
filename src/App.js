import React, { Component } from 'react';
import './App.css';

// import Child Components from Parent Components
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './TodoCreator';
import { TodoRow } from './TodoRow';
import { VisibilityControl } from './VisibilityControl';

// Adding Dynamic Data to our react app
export default class App extends Component {
  constructor(props){
    super(props);
      this.state = 
      {
        userName : "ElfGod",
        course : " React from zero to hero",
        todoItems : [
          { action : "Buy a flowers", done: false },
          { action : "Do workout", done: true},
          { action : "Study programming", done: false},
          { action : "Call my mother", done: true}],
          showCompleted : true
      //    newItemTest : " "
      }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText : event.target.value });
  }

  createNewTodo = (task) => {
    if(!this.state.todoItems
            .find(item => item.action === task ))
            {
              this.setState({
                todoItems : [ ...this.state.todoItems,
                              {action : task,
                              done: false}]},
            () => localStorage.setItem("todos",
                               JSON.stringify(this.state)));
                              // netItemText: ""
            }
  }
  /*
  changeStateData = () => {
    this.setState(
      {userName: this.state.userName == "ElfGod" ? "Elf" : "ElfGod"}
    )
  }
  */
  toggleTodo = (todo) => this.setState(
    { todoItems : this.state.todoItems.map
    (item => item.action === todo.action ? 
      { ...item, done: !item.done } : item )}
  );

  todoTableRows = (doneValue) => this.state.todoItems
  .filter(item => item.done === doneValue)
  .map
      ( item => 
        <TodoRow key={item.action} item={item}
          callback={this.toggleTodo} />);

  // load / Get the kept Data
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState( data!=null ? JSON.parse(data) :
      { 
        userName : "ElfGod",
        course : " React from zero to hero",
        todoItems : [
          { action : "Buy a flowers", done: false },
          { action : "Do workout", done: true},
          { action : "Study programming", done: false},
          { action : "Call my mother", done: true}],
          showCompleted : true
      });
  }

  render()
  {
    return (
      <div>
      <TodoBanner name={this.state.userName} 
                  tasks={this.state.todoItems}
      />
      {/* // TodoBanner is placing this code */}
      {/* <h3 className="bg-primary text-center p-2 text-white">
          {this.state.userName}'s Todo list You Have 
          ({ this.state.todoItems.filter(t=> !t.done).length}) incomplete tasks
      </h3> */}
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />

            <table className="table tablet-striped table-bordered">
              <thead>
              <tr>
                <th>  Todo Task Name  </th>
                <th> Done </th>
              </tr>
              </thead>
              <tbody>
                {/* Show Incomplete Tasks */}
                { this.todoTableRows(false) }
              </tbody>
            </table>

            <div className="bg-danger text-white text-center p-2" >
              {/* Calling Child Components */}
              <VisibilityControl description="Completed Tasks"
                  isChecked={this.state.showCompleted}
                  callback={ (checked) => 
                  this.setState({ showCompleted: checked })} />
            </div>

            { this.state.showCompleted && 
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <td>Task Name</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {/* Show Completed Tasks */}
                { this.todoTableRows(true) }
              </tbody>
            </table>
            }
      </div>
      </div>
      
    );
  }
}