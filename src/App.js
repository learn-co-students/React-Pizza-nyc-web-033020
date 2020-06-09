import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const PIZZAS_URL = 'http://localhost:3000/pizzas'

class App extends Component {
  
  state = {
    pizzas: [],
    editingPizza: {
      id: '',
      topping: '',
      size: '',
      vegetarian: '',
    }
  };
  
  componentDidMount(){
    fetch(PIZZAS_URL)
      .then(resp => resp.json())
      .then(pizzas => {
        this.setState({ pizzas })
      })
  }

  editPizza = (pizzaId) => {
    const pizzas = this.state.pizzas 
    const targetPizza = pizzas.find(pizza => pizza.id == pizzaId)
    this.setState({
      editingPizza: targetPizza
    }, () => console.log(this.state.editingPizza));
  };

  updateTopping = (topping) => {
    this.setState(previousState => {
      return {
        editingPizza: {
          ...previousState.editingPizza,
          topping: topping
        }
      }
    });
  };

  updateSize = (size) => {
    this.setState(previousState => {
      return {
        editingPizza: {
          ...previousState.editingPizza,
          size: size
        }
      }
    });
  };

  render() {
    console.log(this.state.editingPizza)
    return (
      <Fragment>
        <Header/>
        <PizzaForm updateTopping={this.updateTopping} updateSize={this.updateSize} pizzaData={this.state.editingPizza}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
