import React, { useState } from 'react';

/**
 * Component to show single ingridient with buttons to edit/delete
 * @param {any} props
 */

export default function Ingridient(props) {
  const [editIngridientBox, setEditIngridientBox] = useState(false); //state to save if ingridient is editable at the moment
  const [ingridientName, setIngridientName] = useState(props.name); //state to save new name of ingridient

  //functions to handle button actions
  function handleEditIngridient() {
    setEditIngridientBox(true);
  }

    function handleSaveIngridient(e) {
        if (ingridientName.length <= 0) {
            console.log("Ingridient is empty now!");
        } else {
            e.preventDefault();
            props.editIngridient(props.id, ingridientName);
            setEditIngridientBox(false);
        }
  }

  //function to handle input field change
  function handleInputChange(e) {
    setIngridientName(e.target.value);
  }

  //version which shows ingridient with buttons
  const showIngridient = (
    <li className="list-group-item" id={props.id}>
      <div className="ingridient-name row">
        <span className="col-lg-10 col-md-9 col-sm-7">{props.name}</span>
        <span className="btn-group col-2">
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleEditIngridient}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => props.deleteIngridient(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </span>
      </div>
    </li>
  );

  //version to show the editable ingridient
  const editIngridient = (
    <li className="list-group-item" id={props.id}>
      <div className="ingridient-name row">
        <span className="col-lg-10 col-md-9 col-sm-7">
          <input
            type="text"
            className="form-control form-control-sm"
            name="ingridientName"
            value={ingridientName}
            onChange={handleInputChange}
          />
        </span>
        <span className="btn-group col-2">
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={handleSaveIngridient}
          >
            Save <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => props.deleteIngridient(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </span>
      </div>
    </li>
  );

  return editIngridientBox ? editIngridient : showIngridient;
}
