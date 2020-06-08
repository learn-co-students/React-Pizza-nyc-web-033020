import React from "react"

const Pizza = (props) => {
  const {id, size, topping, vegetarian, findOrder} = props
  

  // console.log(props)
  return(
    <tr id={id}>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? 'Vegetarian' : 'Not Vegetarian' }</td>
      <td><button type="button" className="btn btn-primary" onClick={() => findOrder(id)} >Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
