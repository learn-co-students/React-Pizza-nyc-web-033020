import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pizzas: [],
      pizza: {}
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  choosePizza = (pizza) => {
    this.setState({pizza: pizza})
  }

  handleForm = (event) => {
    const editPizza = event.target.value
    this.setState((prevState) => {
      return {pizza: {...prevState.pizza, topping: editPizza}} })
  }

  handleDropdown = (event) => {
    const editSize = event.target.value
    this.setState((prevState) => {
      return {pizza: {...prevState.pizza, size: editSize}}
    })
  }

  handleRadioBtn = (event) => {
    const isVeg = event.target.value === 'Vegetarian'
    this.setState((prevState) => {
      return {pizza: {...prevState.pizza, vegetarian: isVeg}}
    })
  }

  submitForm = () => {
    if(this.state.pizza.id) {
      const pizzaId = this.state.pizza.id
      fetch(`http://localhost:3000/pizzas/${pizzaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.pizza)
      })
      .then(res => res.json())
      .then(pizzaObj => {
        const newPizzaArray = this.state.pizzas.map(pizza => {
          if(pizza.id === pizzaId){
            return pizzaObj
          } else{
            return pizza
          }
        })
        this.setState({pizzas: newPizzaArray})
      })
    }
  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        pizza={this.state.pizza}
        handleForm={this.handleForm}
        handleDropdown={this.handleDropdown}
        handleRadioBtn={this.handleRadioBtn}
        submitForm={this.submitForm}
        />
        <PizzaList  
          pizzas={this.state.pizzas}
          choosePizza={this.choosePizza}
        />
      </Fragment>
    );
  }
}

export default App;
