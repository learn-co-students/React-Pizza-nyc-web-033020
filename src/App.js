import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    pizzaInForm: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(pizzaData => {
      this.setState({
        pizzas: pizzaData
      })
    })
  }

  sendToForm = pizza => {
    this.setState({
      pizzaInForm: pizza
    })
  }

  onType = event => {
    const pizzaTopping = event.target.value
    this.setState((prevState) => {
      return {pizzaInForm: {...prevState.pizzaInForm, topping: pizzaTopping}}
    })
  }

  onDropdown = event => {
    const pizzaSize = event.target.value
    this.setState((prevState) => {
      return {pizzaInForm: {...prevState.pizzaInForm, size: pizzaSize}}
    })
  }

  onRadioButton = event => {
    const isVeg = event.target.value === 'Vegetarian'
    this.setState((prevState) => {
      return {pizzaInForm: {...prevState.pizzaInForm, vegetarian: isVeg}}
    })
  }

  submitForm = () => {
    if(this.state.pizzaInForm.id) {
      const pizzaId = this.state.pizzaInForm.id

      fetch(`http://localhost:3000/pizzas/${pizzaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.state.pizzaInForm)
      })
        .then(res => res.json())
        .then(pizzaObj => {
          const newPizzaArray = this.state.pizzas.map(pizza => {
            if(pizza.id === pizzaId){
              return pizzaObj
            } else {
              return pizza
            }
          })
          this.setState({pizzas: newPizzaArray})
        })
    }
  }

  render() {
    console.log(this.state.pizzaInForm)
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          pizzaInForm={this.state.pizzaInForm}
          onType={this.onType} 
          onDropdown={this.onDropdown}
          onRadioButton={this.onRadioButton}
          submitForm={this.submitForm}
          />
        <PizzaList pizzas={this.state.pizzas} sendToForm={this.sendToForm} />
      </Fragment>
    );
  }
}

export default App;
