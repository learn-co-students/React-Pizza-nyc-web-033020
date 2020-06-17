import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: [],
    pizzaToEdit: {
      id: null,
      vegetarian: false,
      topping: "",
      size: ""
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas: pizzas}))
  }

  editPizza = (pizza) => {
    this.setState({pizzaToEdit: pizza})
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.value
    const name = target.name;
    this.setState({
      pizzaToEdit: {...this.state.pizzaToEdit, [name]: value} //overwriting pizzaToEdit state to the input values // getting name from pizza form by adding them to the form
    });
  }

  onSubmit = () => {
    const {pizzas, pizzaToEdit} = this.state
    fetch(`http://localhost:3000/pizzas/${pizzaToEdit.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...pizzaToEdit}) //giving all the info from pizzaToEdit to the body of the pathc request
    })
    .then(res=> res.json())
    .then(newPizza => {
      // Find the pizza in the array that needs to be replaced
        let pizzaIndex = pizzas.findIndex(pizza => pizza.id === newPizza.id)
        // create a new pizza array where that pizza has been updated
        let newPizzas = [...pizzas]
        newPizzas[pizzaIndex] = newPizza
        // change the pizzas in state to the new array
        this.setState({pizzas: newPizzas,
          pizzaToEdit: {
            id: null,
            vegetarian: false,
            topping: "",
            size: ""
          }
        })
      })
  }



  render() {
    console.log(this.state)
    const {pizzas} = this.state
    return (
      <Fragment>
        <Header/>
        <PizzaForm {...this.state.pizzaToEdit} onSubmit={this.onSubmit} onChange={this.onChange}/>
        <PizzaList pizzas={pizzas} editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;