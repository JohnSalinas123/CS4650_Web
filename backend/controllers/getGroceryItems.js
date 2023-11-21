import GroceryItem from "../models/groceryItemModel.js";

export const getGroceryItems = async (req, res) => {
    try {
        const groceryItems = await GroceryItem.find({});
        res.status(200).json(groceryItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
