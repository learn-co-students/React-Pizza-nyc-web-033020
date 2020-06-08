import React from "react"


class PizzaForm extends React.Component {
  
  
  // editedPizza = (id) => {
  //   fetch(`${BASE_URL}/${id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     }, body: JSON.stringify({
  //       topping: "Plain",
  //       size: "Small",
  //       vegetarian: true
  //     })
  //   })
  //   .then(res => res.json())
  //   .then()
  // }

 
  
  render() {
    const { id, topping, size, vegetarian} = this.props.selectedPizza
    const { onSubmitClick, onChangeHandler, onChangeRadioButton} = this.props
    // console.log(this.props.selectedPizza)


    return(
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control" name='topping' onChange={onChangeHandler} placeholder="Pizza Topping" value={
                  topping
                }/>
          </div>
          <div className="col">
            <select value={size} name='size' onChange={onChangeHandler} className="form-control">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="vegetarianValue" onChange={onChangeRadioButton} 
              value="Vegetarian" checked={vegetarian ? true : false}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={onChangeRadioButton} 
              checked={vegetarian ? false : true}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button  id={id} onClick={onSubmitClick} type="submit" className="btn btn-success">Submit</button>
          </div>
        </div>

    )
  }
}

export default PizzaForm
