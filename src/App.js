import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas:[],
    topping:' ',
    size: ' ',
    vegetarian: true,
    id: null
    
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(r => r.json())
    .then(result=>{
      this.setState({pizzas:result})
    })
  }

  editPizzaHandler = (id) =>{
    let index = this.state.pizzas.findIndex(pizza=> pizza.id === id)
    let changedPizzas = this.state.pizzas
    let targetPizza = changedPizzas[index]
    this.setState({topping : targetPizza.topping, size:targetPizza.size, vegetarian:targetPizza.vegetarian , id:targetPizza.id})
  }

  handleInput = (e) => {
    if(e.target.name === "topping"){
      this.setState({topping: e.target.value})
    }else if(e.target.name === "size"){
      this.setState({size: e.target.value})
    }
  }

  checkHandler = (e) => {
    if(e.target.value==="vegetarian"){
      this.setState({vegetarian:true})
      }else{
        this.setState({vegetarian:false})
      }
  }

  submitHandler = (id) => {
    
    fetch(`http://localhost:3000/pizzas/${id}`,{
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({topping: this.state.topping, size:this.state.size, vegetarian: this.state.vegetarian})
    }).then(r=> r.json()).then(data=>{
      let index = this.state.pizzas.findIndex(pizza=> pizza.id === id)
      let updatedPizzas = this.state.pizzas
      updatedPizzas[index] = data
      this.setState({pizzas: updatedPizzas})
    })
  }
  
  
  
  render() {

    return (
      <Fragment>
        <Header/>
        <PizzaForm all={this.state} handleInput={this.handleInput} checkHandler={this.checkHandler} submitHandler={this.submitHandler}/>
        <PizzaList pizzas={this.state.pizzas} editPizzaHandler={this.editPizzaHandler} />
      </Fragment>
    );
  }
}

export default App;
