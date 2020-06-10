import React from "react"

const PizzaForm = (props) => {
  
  const handleClick = (e) => {
    props.updateWholePizza()
  };

  const handleChange = (e) => {
    props.updateTopping(e.target.value)
  };

  const handleSize = (e) => {
    props.updateSize(e.target.value)
  };

  const handleRadio = (e) => {
    props.updateVeggie(e.target.value)
  };

  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={handleChange} type="text" className="form-control" placeholder="Pizza Topping" value={
                props.pizzaData.topping ? props.pizzaData.topping : ''    
              }/>
        </div>
        <div className="col">
          <select value={props.pizzaData ? props.pizzaData.size : "Small"} className="form-control" onChange={handleSize}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="isveggie" 
              id="isveggie" 
              value="Vegetarian" 
              onChange={handleRadio} 
              checked={props.pizzaData.vegetarian ? true : false}
            />
            <label className="form-check-label" htmlFor="isveggie">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="radio" 
              name="isveggie" 
              id="notveggie" 
              value="Not Vegetarian" 
              onChange={handleRadio} 
              checked={props.pizzaData.vegetarian ? false : true}
            />
            <label className="form-check-label" htmlFor="notveggie">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={handleClick}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
