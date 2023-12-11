import GroceryItem from "../models/groceryItemModel.js";
import GroceryList from "../models/groceryListModel.js";

export const createGroceryList = async (req, res) => {

    console.log("Creating Grocery List!")
    console.log(req.body)

    try {

        const {
            user_id,
            ingredients
        } = req.body

        
        
        const newGroceryList = await GroceryList.create({
            user_id: user_id,
            ingredients: ingredients
        });

        if (!newGroceryList) {
            res.status(400).json({message: "Failed to create grocery list"})
        }

        console.log("Created Grocery List!");
        res.status(201).json({
            ingredients: newGroceryList.ingredients
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
