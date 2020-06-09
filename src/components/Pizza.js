import React from "react"

const Pizza = (props) => {

  const {id, topping, size, vegetarian} = props;

  const handleClick = (e) => {
    // console.log(e.target.id)
    props.editPizza(e.target.id)
  };

  return(
    <tr>
      <td>{topping}</td>
      <td>{size}</td>
      <td>{vegetarian? "Yes" : "No"}</td>
      <td>
        <button
          id={id}
          type="button" 
          className="btn btn-primary" 
          onClick={handleClick}
        >
          Edit Pizza
        </button>
      </td>
    </tr>
  )
}

export default Pizza
