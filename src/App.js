import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas: []
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
    console.log(pizzaId)
  }
  

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm/>
        <PizzaList handleEdit={this.handleEdit} pizzas={this.state.pizzas}/>
      </Fragment>
    );
  }
}

export default App;
