import React from "react"

const Pizza = (props) => {
  // console.log(props.pizza)
  const {id, topping, size, vegetarian} = props.pizza
  // console.log(topping)
  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? "Vegetarian" : "Not Vegetarian"}</td>
      <td><button type="button" className="btn btn-primary" onClick={() => props.editPizza(props.pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza