import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const BASE_URL = 'http://localhost:3000/pizzas'

class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: {},

  }

  componentDidMount() {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(pizzas => {
      this.setState ({ pizzas })
    })
  }

  findOrder = id => {
    const pizza = this.state.pizzas.find(pizza => pizza.id === id)
    this.setState({ selectedPizza: pizza})
  }

  onChangeHandler = e => {
    this.setState({
      selectedPizza: {
       ...this.state.selectedPizza,
        [e.target.name]: e.target.value
      }
    })
   }

  onChangeRadioButton = e => {
    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza,
        vegetarian: e.target.value === 'Vegetarian' ? true : false
      }
    })
  }

  onSubmitClick = e => {
    e.preventDefault()
    const pizzaId = e.target.id
    fetch(`${BASE_URL}/${pizzaId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        this.state.selectedPizza
      )
    }).then(res => res.json())
    .then(updatePizza => {
      let pizzaOrders = [...this.state.pizzas]
      let pizzaChanges = pizzaOrders.findIndex(pizza => pizza.id === updatePizza.id)

      pizzaOrders[pizzaChanges] = updatePizza
      this.setState( {pizzas: pizzaOrders} )
    })


  }

  render() {
    console.log(this.state)
    return (
      <Fragment>
        <Header/>
        <PizzaForm selectedPizza={this.state.selectedPizza} onSubmitClick={this.onSubmitClick} 
        onChangeHandler={this.onChangeHandler} onChangeRadioButton={this.onChangeRadioButton}/>
        <PizzaList pizzas={this.state.pizzas} findOrder={this.findOrder}/>
      </Fragment>
    );
  }
}

export default App;
