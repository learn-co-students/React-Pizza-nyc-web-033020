import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    topping: '',
    size: '',
    vegetarian: null,
    pizzaId: null
  }

  handleChangeText = (event) => { 
    this.setState({
      topping: event.target.value,
    })
  }

  handleChangeDropDown = (event) => {
    this.setState({
      size: event.target.value
    })
  }

  handleChangeRadio = (typeofPizza) => {
    if (typeofPizza === "Vegetarian"){
      this.setState({
        vegetarian: true
      })
    } else if (typeofPizza === "Not Vegetarian") {
      this.setState({
        vegetarian: false
      })
    }
  }

  fetchPizzaDataFromServer = () => {
    fetch(`http://localhost:3000/pizzas`)
    .then(r => r.json())
    .then(pizzas =>{
      this.setState({pizzas})
    })
  }

  componentDidMount(){
    this.fetchPizzaDataFromServer()
  }

  handleEdit = (pizzaId) => {
    this.setState({pizzaId}) 
    fetch(`http://localhost:3000/pizzas/${pizzaId}`)
    .then(r=>r.json())
    .then(newPizza => {
      this.setState({
        topping: newPizza.topping,
        size: newPizza.size,
        vegetarian: newPizza.vegetarian
      })
    })
  }
  
  handleSubmit = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }, body: JSON.stringify({
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    }
    fetch(`http://localhost:3000/pizzas/${this.state.pizzaId}`, options)
    .then(r=>r.json())
    .then(this.fetchPizzaDataFromServer)
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          handleChangeText={this.handleChangeText}
          handleChangeDropDown={this.handleChangeDropDown}
          handleChangeRadio={this.handleChangeRadio}
          handleSubmit={this.handleSubmit}
          topping={this.state.topping}
          size={this.state.size}
          vegetarian={this.state.vegetarian}
        />
        <PizzaList
          handleEdit={this.handleEdit}
          pizzas={this.state.pizzas}
        />
      </Fragment>
    );
  }
}

export default App;
