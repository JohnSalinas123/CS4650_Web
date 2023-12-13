import GroceryList from "../models/groceryListModel.js";

export const updateGroceryItem = async (req, res) => {
    // Assume the request body contains { ingredient_id, quantity }
    const { user_id, item_id, active } = req.body

    try {
        // Find the GroceryItem document by userId and update the specific ingredient
        const groceryItem = await GroceryList.findOneAndUpdate(
            { 
                user_id: user_id, 
                "ingredients._id" : item_id
            },
            { 
                $set: { 'ingredients.$.active': active }
            },
            { new: true } // Return the updated document
        );

        if (!groceryItem) {
            return res.status(404).json({ message: "Grocery item not found or ingredient not found." });
        }

        console.log("Updated GroceryItem ingredient active state!");
        res.status(200).json({
            active: active
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
