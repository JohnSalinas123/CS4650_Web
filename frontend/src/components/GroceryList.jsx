import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GroceryList.css'; 

const GroceryList = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const userId = "6558101f0b88fdd372f28e55"//localStorage.getItem('user'); 

  
  useEffect(() => {
    if (userId) {
      fetchGroceryItems(userId);
    }
  }, [userId]);


  const fetchGroceryItems = async (userId) => {
    try {
      const response = await axios.get(`/api/user/getGroceryItem/${userId}`);
      setGroceryItems(response.data);
    } catch (error) {
      console.error('Error fetching grocery items:', error);
    }
  };

  const updateGroceryList = async (itemId, ingredientId, newQuantity) => {
    try {
      const payload = { ingredient_id: ingredientId, quantity: newQuantity };
      await axios.put(`/api/user/updateGroceryItem/${itemId}`, payload);
      // Update the state with the new quantity immediately
      setGroceryItems(groceryItems.map(item => {
        if (item._id === itemId) {
          return {
            ...item,
            ingredients: item.ingredients.map(ing => {
              if (ing.ingredient_id === ingredientId) {
                return { ...ing, quantity: newQuantity };
              }
              return ing;
            })
          };
        }
        return item;
      }));
    } catch (error) {
      console.error('Error updating grocery list:', error);
    }
  };

  const handleQuantityChange = (itemId, ingredientId, change) => {
    const newGroceryItems = groceryItems.map(item => {
      if (item._id === itemId) {
        return {
          ...item,
          ingredients: item.ingredients.map(ingredient => {
            if (ingredient.ingredient_id === ingredientId) {
              const newQuantity = ingredient.quantity + change;
              if (newQuantity >= 0) {
                updateGroceryList(itemId, ingredientId, newQuantity);
                return { ...ingredient, quantity: newQuantity };
              }
            }
            return ingredient;
          })
        };
      }
      return item;
    });

    // Update the local state to reflect the change immediately
    setGroceryItems(newGroceryItems);
  };

  return (
    <div className="grocery-list-container">
      <h3>Grocery List</h3>
      {groceryItems.map((item) => (
        <div key={item._id} className="grocery-item">
          <h4>{item.name}</h4>
          <ul>
            {item.ingredients.map((ingredient) => (
              <li key={ingredient.ingredient_id} className="ingredient-item">
                {ingredient.name}
                <button onClick={() => handleQuantityChange(item._id, ingredient.ingredient_id, -1)}>-</button>
                <span className="quantity-box">{ingredient.quantity}</span>
                <button onClick={() => handleQuantityChange(item._id, ingredient.ingredient_id, 1)}>+</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GroceryList;




