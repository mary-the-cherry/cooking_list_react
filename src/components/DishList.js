import React, { useState, useEffect } from 'react';
import Ingridient from './Ingridient';
import AddIngridient from './AddIngridient';
import { nanoid } from 'nanoid';

/**
 *
 * Component to show a dish as a list element with its ingridients
 * @param {any} props
 */

export default function DishList(props) {
  const [editDishName, setEditDishName] = useState(false); //state to decide of dish is editable or not
  const [newName, setNewName] = useState(props.dishname); //state to save new dish name
  const [ingridientsDish, setIngridientsDish] = useState(props.ingridients); //state to store ingridients of the dish

  //whenever the ingridientList changes the overall dish list is updated
  useEffect(() => {
    props.updateIngridient(props.id, ingridientsDish);
  }, [ingridientsDish]);

  // constructor to call an ingridient
  const ingridientList = ingridientsDish.map((ingridient) => (
    <Ingridient
      name={ingridient.name}
      id={ingridient.id}
      key={ingridient.id}
      deleteIngridient={deleteIngridientDish}
      editIngridient={editIngridientDish}
    />
  ));

  //handle button actions
  function handleEditSubmit() {
    setEditDishName(true);
  }

    function handleSaveSubmit(e) {
        if (newName.length<=0) {
            props.handleErrorMsg("Dishname is empty! Please enter a Dishname to continue.");
        } else {
          
          e.preventDefault();
          props.editDish(props.id, newName);
          setEditDishName(false);
      }
    
  }

  //handle change of input field
  function handleInputChange(e) {
    setNewName(e.target.value);
  }

  //functions to edit/delete/add ingridients
  function deleteIngridientDish(id) {
    const reducedIngridients = ingridientsDish.filter(
      (ingridient) => ingridient.id !== id
    );
    setIngridientsDish(reducedIngridients);
  }

  function editIngridientDish(id, editedName) {
    const editedIngridient = ingridientsDish.map((ingridient) => {
      if (id === ingridient.id) {
        return { ...ingridient, name: editedName };
      }
      return ingridient;
    });
    setIngridientsDish(editedIngridient);
  }

 

  function addIngridient(name) {
    const newIngridientItem = { id: 'ingr-' + nanoid(), name: name };
    setIngridientsDish([...ingridientsDish, newIngridientItem]);
  }

  
  // version to render to show dish with ingridients
  const editDish = (
    <li className="dish list-group-item">
      
      <div className="dish-name row">
        <span className="col-lg-8 col-md-7 col-sm-6">
        <input
          type="text"
          className="form-control"
          id={props.id}
          name="dishname"
          value={newName}
          onChange={handleInputChange}
                  />
       </span>
        <span className="btn-group col-2">
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleSaveSubmit}
          >
            Save <span className="visually-hidden">{props.dishname}</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => props.deleteDish(props.id)}
          >
            Delete <span className="visually-hidden">{props.dishname}</span>
          </button>
        </span>
      </div>
      <div className="container">
        <ul
          className="ingridient-list-dish list-group list-group-flush"
          aria-labelledby="list-heading-ingridients"
        >
          {ingridientList}
                  <AddIngridient
                      addIngridient={addIngridient}
                  />
        </ul>
      </div>
    </li>
  );

  //version to show editable Dish with its ingridients
  const showDish = (
    <li className="dish list-group-item">
      <div className="dish-name row ">
        <input
          id="{props.id}"
          className="form-check-input"
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleDishCompleted(props.id)}
        />
        <label htmlFor="{props.id}" className="col-8">
          {props.dishname}
        </label>
        <span className="btn-group col-2">
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleEditSubmit}
          >
            Edit <span className="visually-hidden">{props.dishname}</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => props.deleteDish(props.id)}
          >
            Delete <span className="visually-hidden">{props.dishname}</span>
          </button>
        </span>
      </div>
      <div className="container">
        <ul
          className="ingridient-list-dish list-group list-group-flush"
          aria-labelledby="list-heading-ingridients"
        >
          {ingridientList}
          <AddIngridient addIngridient={addIngridient} />
        </ul>
      </div>
    </li>
  );

  return editDishName ? editDish : showDish;
}
