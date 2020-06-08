import React from "react"

const Pizza = (props) => {
  let {pizza, choosePizza} = props 

  return(
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? 'Vegetarian' : 'Not Vegetarian'}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => choosePizza(pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
