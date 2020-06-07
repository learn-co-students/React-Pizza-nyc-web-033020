import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={props.change} name='topping' type="text" className="form-control" placeholder="Pizza Topping" value={props.pizzaToEdit.topping}/>
        </div>
        <div className="col">
          <select onChange={props.change} name='size' value={props.pizzaToEdit.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value='true' checked={props.pizzaToEdit.vegetarian} onClick={props.toggle} />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="false" checked={!props.pizzaToEdit.vegetarian} onClick={props.toggle}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" name={props.pizzaToEdit.id} className="btn btn-success" onClick={props.submitPizza}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
