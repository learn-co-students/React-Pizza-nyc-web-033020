import React from "react"

const Pizza = (props) => {
  // console.log("pizza:",props)
  const {id, topping,size, vegetarian} = props
  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian ? 'Yes' : 'No'}</td>
      <td><button onClick={()=>props.editPizzaHandler(id)} type="button"  className="btn btn-primary">Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
