import React, { useState } from 'react';

/**
 * Component to add a new Ingridient
 * @param {any} props
 */

export default function AddIngridient(props) {
  const [newIngridient, setNewIngridient] = useState(''); //state to save name of new ingridient

  // function to handle input change
  function handleIngridientChange(e) {
    setNewIngridient(e.target.value);
  }

  // function to handle add button
    function handleAddIngridient() {
        if (newIngridient.length <= 0) {
            console.log("The Ingridientfield is empty");
        }
        else {
            props.addIngridient(newIngridient);
            setNewIngridient('');
        }
  }

  return (
    <li className="list-group-item">
      <div className="ingridient-name row">
        <span className="col-lg-10 col-md-9 col-sm-7">
          <input
            type="text"
            className="ingridient-input form-control form-control-sm"
            id="ingridient-name"
            name="ingridient"
            placeholder=""
            value={newIngridient}
            onChange={handleIngridientChange}
          />
        </span>
        <span className="col-2">
          <button
            type="button"
            className="add-ingridient-btn btn btn-info btn-sm"
            onClick={handleAddIngridient}
          >
            <strong> + </strong>
          </button>
        </span>
      </div>
    </li>
  );
}
