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
      vegetarian: false
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

  updateVeggie = (vegOrNot) => {
    if(vegOrNot === "Vegetarian"){
      this.setState(previousState => {
        return {
          editingPizza: {
            ...previousState.editingPizza,
            vegetarian: true
          }
        }
      });
    } else {
      this.setState(previousState => {
        return {
          editingPizza: {
            ...previousState.editingPizza,
            vegetarian: false
          }
        }
      });
    }
  };

  updateWholePizza = () => {
    fetch(`${PIZZAS_URL}/${this.state.editingPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify( this.state.editingPizza )
    })
      .then(resp => resp.json())
      .then(pizza => {
        alert(`pizza ${pizza.id}  updated`)
        fetch(PIZZAS_URL)
          .then(resp => resp.json())
          .then(pizzas => {
            this.setState({ pizzas })
          })
      })
    
  };

  render() {  

    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          pizzaData={this.state.editingPizza}
          updateTopping={this.updateTopping} 
          updateSize={this.updateSize}
          updateVeggie={this.updateVeggie}
          updateWholePizza={this.updateWholePizza}                      
        />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
