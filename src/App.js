import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import PizzaForm from "./components/PizzaForm";
import PizzaList from "./containers/PizzaList";

const baseUrl = "http://localhost:3000/pizzas/";

class App extends Component {
  state = {
    pizzas: [],
    pizzaForm: {
      id: null,
      topping: "",
      size: "Small",
      vegetarian: null,
    },
  };

  componentDidMount() {
    this.fetchPizzas();
  }

  fetchPizzas = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((json) => this.setState({ pizzas: json }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("pizza: ", this.state.pizzaForm);

    if (this.state.pizzaForm.id) {
      this.patchPizza(this.state.pizzaForm);
    } else {
      this.postPizze(this.state.pizzaForm);
    }
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      pizzaForm: {
        id: null,
        topping: "",
        size: "Small",
        vegetarian: null,
      },
    });
  };

  patchPizza = (pizza) => {
    fetch(baseUrl + pizza.id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    }).then(this.fetchPizzas);
  };

  postPizze = (pizza) => {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    }).then(this.fetchPizzas);
  };

  handleForm = (event) => {
    const target = event.target;
    const form = { ...this.state.pizzaForm };
    form[target.name] = target.value;
    this.setState({ pizzaForm: form });
  };

  editPizza = (pizza) => {
    pizza.vegetarian = pizza.vegetarian ? "Vegetarian" : "Not Vegetarian";
    this.setState({ pizzaForm: pizza }, () => console.log(this.state));
  };

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm
          handleForm={this.handleForm}
          handleSubmit={this.handleSubmit}
          {...this.state.pizzaForm}
        />
        <PizzaList editPizza={this.editPizza} pizzas={this.state.pizzas} />
      </Fragment>
    );
  }
}

export default App;
