import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

let quotes = ["lalalallaa", "loooooolalaooooo", "pooptastic dookie fart", "sashiiii poopy", "live in the moment", "PEETA4LIFE", "ants in ma pants!"]

const holidays = {
  "2": {
    20: "Dog Day",
    21: "Mom Day"
  },
  "3": {
    1: "Turtle day",
    2: "Pie day"

  }
}

const d = new Date()
const month = d.getMonth()
const date = d.getDate()
const holiday = holidays[month][date]
console.log(holiday)

class ShoppingListItem extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
      this.state = {
        name: this.props.name,
        clicked: false,
      }
  }

  handleClick(){
    if(!this.state.clicked){
      this.setState({
        name: this.state.name + " Bought!",
        clicked: true,
      })
    }
  }

  render(){
    return(
      <li>{this.props.name} &nbsp;
      <button
        onClick={() => this.props.onClick(this.props.index)}
        > Done?
      </button>
      </li>

    );
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let newDay = new Date()
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // let holidays = holidays[month][date]
  this.state = {
    day: daysOfWeek[newDay.getDay()],
    date: newDay.getDate(),
    month: newDay.getMonth(),
    index: 0,
    name: this.props.name,
    myInitialList: ["Take iron", "Make oats", "Clean room"],
    myInitialClicked: [false, false, false],
    itemsBoughtCounter: 0,
    pendingItem: "",
  }

  this.onKeyUp = this.onKeyUp.bind(this);
  this.onAddItem = this.onAddItem.bind(this);
}

onAddItem(event){
  //prevent default to avoid changing the enter key
  event.preventDefault();

  //make copies of the initial state
  let listUpdate = this.state.myInitialList.slice();
  let clickedUpdate = this.state.myInitialClicked.slice();
  //add new item
  listUpdate.push(this.state.pendingItem);
  clickedUpdate.push(false);

  //update the state
  this.setState({
    myInitialList: listUpdate,
    myInitialClicked: clickedUpdate,
    pendingItem: this.state.pendingItem,
  });


}

onKeyUp(event){
  this.setState({
    pendingItem: event.target.value,
  })
}

handleClick(i){

  let listUpdate = this.state.myInitialList.slice();
  let clickedUpdate = this.state.myInitialClicked.slice();

  if(!this.state.myInitialClicked[i]){
    listUpdate[i] += " Done";
    clickedUpdate[i] = true;
  }

  const count = clickedUpdate.filter(Boolean).length;
  this.setState({
    myInitialList: listUpdate,
    myInitialClicked: clickedUpdate,
    itemsBoughtCounter: count,
  })
}

renderList(){
  const contentToReturn = [];

  for(let i = 0; i < this.state.myInitialList.length; i++){
    let item = <ShoppingListItem
      key={i}
      name={this.state.myInitialList[i]}
      onClick = {(i) => this.handleClick(i)}
      index = {i}/>
    contentToReturn.push(item);
  }
  return contentToReturn;
}


newquote(index){
  let newindex=this.state.index +1
  if(newindex > quotes.length -1){
    newindex=0
  }
  this.setState({index:newindex})
}
  
  render() {

    return (
      <div className="Dashboard">
        <Title/>
        <Day day={this.state.day} date={this.state.date}/>
        <Quotes newquote={() => this.newquote()} index={this.state.index}/>
        <TodoList/>
          {this.renderList()}
          <form>
           <label htmlFor="add an item"> &nbsp;</label>
           <input
             type="text"
             name="add an item"
             placeholder="add"
             value={this.state.pendingItem}
             onChange={this.onKeyUp}
           />
           <button onClick={this.onAddItem}> Submit </button>
        </form>
        <Notes/>
      </div>
    );
  }
}

function Title(){
  let yourName = "Kelly";
  return(
    <div className="main-title">
      <h2>{yourName}'s Dashboard</h2>
    </div>
  );
}

function Day(props){
  return(
    <div className="day">
      <h1>Today is {props.day} {props.date}. Happy National {holiday}!</h1>
    </div>
  );

}

function Quotes(props){
  return(
    <div className="quote">
        <h1>Quote: {quotes[props.index]}</h1>
        <button
        onClick={() => props.newquote()}>
        New Quote
        </button>
    </div>
  );
}

function TodoList(){
  return(
    <div className="todo-list">
      <h2>Todo</h2>
    </div>
  );
}

function Notes(){
  return(
    <div className="todo-list">
      <h2>Notes</h2>
      <input className="e-input" type="text" placeholder="" style={{width: "370px", height: "200px"}}  />   
    </div>
  );
}

export default Dashboard
