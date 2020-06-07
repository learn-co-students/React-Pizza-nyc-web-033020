import React from "react"

const PizzaForm = (props) => {
  // console.log("form!!!", props.all.editPizza)
  const {id,topping, size, vegetarian} = props.all.editPizza
  return(
      <div className="form-row">
        <div className="col-5" >
            <input type="text" className="form-control" name="topping" placeholder="Pizza Topping" value={topping} onChange={props.handleInput}/>
        </div>
        <div className="col">
          <select value={size} name="size" className="form-control" onChange={props.handleInput}>
            <option value="Small">Small </option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col"  onChange={props.checkHandler}>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="vegetarian" value="vegetarian" checked={vegetarian===true}  />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio"  name="vegetarian" value="not vegetarian"checked={vegetarian===false} />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={()=>props.submitHandler(id)}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm