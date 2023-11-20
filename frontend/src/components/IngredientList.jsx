import React, { useState, useEffect } from "react";
import axios from "axios";

export const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get("/api/ingredients")
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Ingredients</h1>
      <ul>
        {ingredients.map(ingredients => (
          <li key={ingredients._id}>
            <h3>{u=ingredients.name}</h3>
            <p>{ingredients.calories}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
