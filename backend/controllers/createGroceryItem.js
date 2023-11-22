


import GroceryItem from "../models/groceryItemModel.js";

export const createGroceryItem = async (req, res) => {
    try {
        const newGroceryItem = new GroceryItem(req.body);
        const savedGroceryItem = await newGroceryItem.save();
        console.log("Created Grocery Item!");
        res.status(201).json(savedGroceryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
