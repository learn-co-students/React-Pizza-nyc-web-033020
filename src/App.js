import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  state = {
    pizzas: [],
    filterType: null,
    pizzaToEdit: {
      vegetarian: null,
    }
  }

 componentDidMount(){
   fetch('http://localhost:3000/pizzas')
   .then(res => res.json())
   .then(pizzas => {
     this.setState({
       pizzas: [...pizzas]
     })
   })
 }  

 editPizza = (event) => {
   const editPizzaId = event.target.name
   const index = editPizzaId - 1 
   let editPizza = this.state.pizzas[index]
   this.setState({ pizzaToEdit: editPizza})
 }


  change = (event) => {
    this.setState({ 
      pizzaToEdit: {...this.state.pizzaToEdit, [event.target.name]: event.target.value}
     })
 }

 submitPizza = (event) => {
   const pizzId = event.target.name
   fetch(`http://localhost:3000/pizzas/${pizzId}`, {
     method: 'PATCH',
     headers: {
       'content-type': 'application/json',
       accept: 'application/json'
     }, body: JSON.stringify(this.state.pizzaToEdit)
   }).then(res => res.json()).then(newPizza => {
     let index = (newPizza.id - 1)
     let newPizzaArray = this.state.pizzas.slice()
     newPizzaArray[index] = newPizza
     this.setState({pizzas: [...newPizzaArray]})
   })
 }


 toggle = (event) => {
   console.log(event.target.value)
   this.setState({
     pizzaToEdit: { ...this.state.pizzaToEdit, vegetarian: event.target.value }
   })
 }

  render() {
    let pizzasShown = this.state.pizzas 
    console.log(this.state.pizzas)

    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaToEdit={this.state.pizzaToEdit} change={this.change} submitPizza={this.submitPizza} toggle={this.toggle}/>
        <PizzaList pizzas={pizzasShown} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
