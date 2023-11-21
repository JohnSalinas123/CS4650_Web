import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/ingredient.css"
import "../styles/general.css"
import carb from '../resources/carb_ingredient.png'
import protein from '../resources/protein_ingredient.png'
//import getImg from "./IngredientImg";

axios.defaults.baseURL = 'http://localhost:8080/';

export const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    try{
      const {ingredientArr} = axios.get('api/ingredients')
      .then(response => setIngredients(response.data))
      .catch(error => console.error(error));
  
    }catch(err){
      console.error(err);
    }
  }, []);
    

  return (
    <><div class="grid-container">

      {ingredients.map(ingredients => (
        <div class="item-container" key={ingredients._id}>
          <img src={protein} height = {200} width = {200}></img>
          <h3>{ingredients.name}</h3>
          <p>{ingredients.category}</p>
          <p>{ingredients.calories}</p>
          
        </div>
      ))}
    </div><p>You Reach The End</p></>
    
  );
}