import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NewEntry from './components/NewEntry';
import DishList from './components/DishList';
import Ingridient from './components/Ingridient';
import Filter from './components/Filter';
import { nanoid } from 'nanoid';

const INGRI = [];

const FILTER_MAP = {
  All: () => true,
  Cooked: (dishes) => dishes.completed,
  uncooked: (dishes) => !dishes.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [dishes, setDishes] = useState(props.dishes); //state with list of dishes
  const [ingridients, setIngridients] = useState(INGRI); //state with list of ingridients
  const [showShoppingList, setShowShoppingList] = useState(false); //state to decice if shopping list is shown
  const [shoppingList, setShoppingList] = useState([]); //state to store overview of all ingridients
  const [filter, setFilter] = useState('All'); //state to store filter
  const [showErrorMessage, setShowErrorMessage] = useState(false); //state to decide if error message is shown  
  const [errorMessage,setErrorMessage] = useState('No Error Message set!');

  // call construction for each single ingridient
  const ingridientList = ingridients.map((ingridient) => (
    <Ingridient
      name={ingridient.name}
      id={ingridient.id}
      key={ingridient.id}
      deleteIngridient={deleteIngridient}
      editIngridient={editIngridient}
      addIngridient={addIngridient}
    />
  ));

  //call construction for each single dish
  const dishList = dishes
    .filter(FILTER_MAP[filter])
    .map((dish) => (
      <DishList
            dishname={dish.name}
            completed={dish.completed}
            ingridients={dish.ingridients}
            id={dish.id}
            key={dish.id}
            toggleDishCompleted={toggleDishCompleted}
            deleteDish={deleteDish}
            editDish={editDish}
            updateIngridient={updateIngridient}
            handleErrorMsg={handleErrorMsg}
      />
    ));

  //call construction for each single filter
  const filterList = FILTER_NAMES.map((name, active) => (
    <Filter
      key={name}
      name={name}
      active={name === filter}
      setFilter={setFilter}
    />
  ));

  // functions to add/reduce/edit dishes in state dishes
  function addDish(name) {
          const newDish = {
              id: 'dish-' + nanoid(),
              name: name,
              completed: false,
              ingridients: ingridients,
          };
          setDishes([...dishes, newDish]);
          setIngridients([]);
  }

  function deleteDish(id) {
    const reducedDishList = dishes.filter((dish) => dish.id !== id);
    setDishes(reducedDishList);
  }

  function toggleDishCompleted(id) {
    const updatedDish = dishes.map((dish) => {
      if (id === dish.id) {
        return { ...dish, completed: !dish.completed };
      }
      return dish;
    });
    setDishes(updatedDish);
  }

  function editDish(id, newName) {
    const updatedName = dishes.map((dish) => {
      if (id === dish.id) {
        return { ...dish, name: newName };
      }
      return dish;
    });
    setDishes(updatedName);
  }

  // functions to add/edit/delete/update ingridient
    function addIngridient(newName) {    
    const newIngridientEntry = { name: newName, id: 'ingi-' + nanoid() };
    setIngridients([...ingridients, newIngridientEntry]);
  }

  function deleteIngridient(id) {
    const reducedIngridients = ingridients.filter(
      (ingridient) => ingridient.id !== id
    );
    setIngridients(reducedIngridients);
  }

  function updateIngridient(id, ingridients) {
    const updatedDish = dishes.map((dish) => {
      if (id === dish.id) {
        return { ...dish, ingridients: ingridients };
      }
      return dish;
    });
    setDishes(updatedDish);
  }

  function editIngridient(id, editedName) {
    const editedIngridient = ingridients.map((ingridient) => {
      if (id === ingridient.id) {
        return { ...ingridient, name: editedName };
      }
      return ingridient;
    });
    setIngridients(editedIngridient);
  }

  // function to create shopping list
  function handleShoppingListBtn() {
    const newShoppingList = dishes.map((dish) =>
      dish.ingridients.map((ingridient) => ingridient.name)
    );  
      setShoppingList(newShoppingList.flat());
      setShowShoppingList(true);
      console.log(shoppingList);
      
    
  }


  //function to close shopping list
  function handleCloseBtn() {
      setShowShoppingList(false);
      setShowErrorMessage(false);
  }

  // function to handle Error Message for empty dish field while creating a new dish
    function handleErrorMsg(text) {
        console.log(text);
        setErrorMessage(text);
        setShowErrorMessage(true);
    }

  //main rendered app
  return (
    <div className="background">
      <div className="app-complete container">
        <header className="app-header">
          <h1 className="document-title">Your awesome Cooking Plan</h1>
          <h5 className="introduction">
            Track your cooking ideas on his side and always have an overview
            what you need to buy for it.
          </h5>
          <h5 className="introduction">Start now with your first entry</h5>
        </header>
        <NewEntry
          addDish={addDish}
          ingridientList={ingridientList}
          addIngridient={addIngridient}
          handleErrorMsg={handleErrorMsg}
        />
        <div className="dish-list container">
          <h2 id="list-heading-dishes">Dishes to cook in the next time</h2>
          <div className="filter-button-group ">
            <div className="btn-group">{filterList}</div>
          </div>
          <div>
            <ul
              className="dish-list list-group list-group-flush container"
              aria-labelledby="list-heading-dishes"
            >
              {dishList}
            </ul>
            <div className="shopping-list-button">
              <button
                type="button"
                className="btn btn-outline-info btn-lg"
                onClick={handleShoppingListBtn}
              >
                Show shopping List
              </button>
            </div>
            {showShoppingList && (
              <div className="pop-up">
                <div className="pop-up-inner">
                  <h3>Shopping List</h3>
                  {<p> You have {shoppingList.length} Ingridients on your List!</p>}
                  <ul>
                    {shoppingList.length >= 1  && shoppingList.map((ingridient) => (
                          <li key={nanoid()}>{ingridient}</li>
                      ))
                    }
                  </ul>
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={handleCloseBtn}
                  >
                    Close
                  </button>
                </div>
              </div>
             )}
            {showErrorMessage && (
              <div className="pop-up">
                <div className="pop-up-inner">
                   <h3>Error</h3>
                   <p>
                     {errorMessage}
                   </p>
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={handleCloseBtn}
                  >
                    Close
                  </button>
                </div>
              </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
