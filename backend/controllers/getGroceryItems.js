/*
const testGroceryItem = {
    "_id": "ObjectId('65580c9f0b88fdd372ee7513')",
    "user_id": 1,
    "active": true,
    "ingredients": [
      {
        "ingredient_id": 1,
        "name": "Burger Patty",
        "quantity": 2
      },
      {
        "ingredient_id": 2,
        "name": "Cheddar Cheese",
        "quantity": 2
      }
    ]
};
 */ 


/*replace   .json(testGroceryItems)*/

import GroceryItem from "../models/groceryItemModel.js";
import mongoose from "mongoose";


export const getGroceryItems = async (req, res) => {
    try {
        const userId = req.params.userId; // Directly use the userId as a string

        // check what query looks like
        console.log('UserID:', userId);
        console.log('Query:', GroceryItem.find({ user_id: userId }).toString());

        const groceryItems = await GroceryItem.find({ user_id: userId });
        console.log(groceryItems);// check what is returned
        res.status(200).json(groceryItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

