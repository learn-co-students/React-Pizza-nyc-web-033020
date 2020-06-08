import React from "react";

const PizzaForm = (props) => {
  return (
    <div className="form-row">
      <div className="col-5">
        <input
          type="text"
          className="form-control"
          placeholder="Pizza Topping"
          value={props.topping}
          name="topping"
          onChange={props.handleForm}
        />
      </div>
      <div className="col">
        <select
          onChange={props.handleForm}
          value={props.size}
          className="form-control"
          name="size"
        >
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
            name="vegetarian"
            value="Vegetarian"
            onChange={props.handleForm}
            checked={props.vegetarian === "Vegetarian"}
          />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="vegetarian"
            value="Not Vegetarian"
            onChange={props.handleForm}
            checked={props.vegetarian === "Not Vegetarian"}
          />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button
          type="submit"
          className="btn btn-success"
          onClick={props.handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PizzaForm;
