import GroceryList from "../models/groceryListModel.js";

export const clearGroceryList = async (req, res) => {

    const { userId } = req.params;

    try {

        const groceryItem = await GroceryList.findOneAndUpdate(
            { 
                user_id: userId, 
            },
            { 
                $set: { 'ingredients': [] }
            },
            { new: true } // Return the updated document
        );

        if (!groceryItem) {
            return res.status(404).json({ message: "Grocery item not found or ingredient not found." });
        }

        console.log("Cleared Grocery List!");
        res.status(201).json({
            ingredients: groceryItem.ingredients
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};