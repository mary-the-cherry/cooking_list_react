import React, { useState } from 'react';

/**
 * /
 * Component to add a new dish/ component toggle between a "New Entry Button" and the "New Entry Form"
 * @param {any} props
 */

export default function NewEntry(props) {
  const [editNewDish, setEditNewDish] = useState(false); //state to toogle between edit and button version
  const [newDish, setNewDish] = useState(''); //state for controlled input Dish
  const [newIngridient, setNewIngridient] = useState(''); //state for controlled input Ingridient

  //functions for controlled input
  function handleDishChange(e) {
    setNewDish(e.target.value);
  }

  function handleIngridientChange(e) {
    setNewIngridient(e.target.value);
  }

  //functions to handle Buttons
  function handleSubmit(e) {
      e.preventDefault();
      if (newDish.length <= 0) {
          props.handleErrorMsg("No Dish Name was inserted!");
      }
      else {
          console.log(newDish);
          props.addDish(newDish);
          setNewDish('');
          setNewIngridient('');
          setEditNewDish(false);
      }
  }

    function handleAddIngridient(e) {
        if (newIngridient <= 0) {
            props.handleErrorMsg("No Ingridient was inserted!");
        }
        else {
            e.preventDefault();
            props.addIngridient(newIngridient);
            setNewIngridient('');
        }
    
  }

  //Buttonversion to render
  const newEntryButton = (
    <div className="entry-part-btn">
      <button
        type="submit"
        className="btn btn-outline-info btn-lg btn-new-entry"
        onClick={() => setEditNewDish(true)}
      >
        New Entry
      </button>
    </div>
  );

  //New Entry Form to render
  const newEntryTemplate = (
    <div className="new-entry ">
      <form onSubmit={handleSubmit}>
        <h2>New Entry</h2>
        <div className="form-group row">
          <label
            htmlFor="dish-name"
            className="col-sm-3 col-form-label col-form-label-lg"
          >
            Dish
          </label>
          <div className="col-sm-9 row">
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              id="dish-name"
              name="dish"
              placeholder="Lasagne"
              value={newDish}
              onChange={handleDishChange}
            />
          </div>
        </div>
        <div className="ingridient-form">
          <div className="form-group row">
            <label
              htmlFor="ingridient-name"
              className="col-sm-3 col-form-label col-form-label-lg"
              id="list-heading-ingridients"
            >
              Ingridient
            </label>
            <div className="col-sm-9 new-ingridient row">
              <input
                type="text"
                className="ingridient-input form-control form-control-lg"
                id="ingridient-name"
                name="ingridient"
                placeholder="Tomatos"
                value={newIngridient}
                onChange={handleIngridientChange}
              />
              <button
                type="button"
                className="add-ingridient-btn btn btn-info btn-lg"
                onClick={handleAddIngridient}
              >
                Add
              </button>
            </div>
          </div>
          <div className="container">
            <ul
             
              className="ingridient-list-dish list-group list-group-flush"
              aria-labelledby="list-heading-ingridients"
            >
              {props.ingridientList}
            </ul>
          </div>
        </div>
        <div className="add-dish-btn-group">
          <div className="btn-group">
            <button type="submit" className="btn btn-outline-info btn-lg">
              Add <span className="visually-hidden">Dish</span>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={() => setEditNewDish(false)}
            >
              Cancel <span className="visually-hidden">Dish </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  //depending on state editNewDish one of the two versions will be rendered
  return (
    <div className="entry-part">
      {editNewDish ? newEntryTemplate : newEntryButton}
    </div>
  );
}
