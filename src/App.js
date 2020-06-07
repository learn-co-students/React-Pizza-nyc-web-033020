import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    pizzas:[],
    editPizza:{},
    topping:' ',
    size: ' ',
    vegetarian: true
    
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
    this.setState({editPizza : targetPizza})
  }

  handleInput = (e) => {
    this.setState({
      editPizza: {...this.state.editPizza, [e.target.name]: e.target.value}
    })
  }

  checkHandler = (e) => {
    if(e.target.value==="vegetarian"){
      this.setState({
        editPizza: {...this.state.editPizza,
          vegetarian:true
        }
      })
    }else{
      this.setState({
        editPizza: {...this.state.editPizza,
          vegetarian:false
        }
      })
    }
  }

  submitHandler = (id) => {
    let updatedPizza = this.state.editPizza 
    console.log(updatedPizza)
    fetch(`http://localhost:3000/pizzas/${id}`,{
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.editPizza)
    }).then(r=> r.json()).then(data=>{
      let index = this.state.pizzas.findIndex(pizza=> pizza.id === id)
      let updatedPizzas = this.state.pizzas
      updatedPizzas[index] = data
      this.setState({pizzas: updatedPizzas})
    })
  }



  render() {
    console.log(this.state.editPizza)
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
