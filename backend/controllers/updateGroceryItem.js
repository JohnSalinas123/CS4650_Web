import GroceryItem from "../models/groceryItemModel.js";

export const updateGroceryItem = async (req, res) => {
    // Assume the request body contains { ingredient_id, quantity }
    const { userId } = req.params;
    const { ingredient_id, quantity } = req.body;

    try {
        // Find the GroceryItem document by userId and update the specific ingredient
        const groceryItem = await GroceryItem.findOneAndUpdate(
            { 
                user_id: userId, 
                'ingredients.ingredient_id': ingredient_id 
            },
            { 
                $set: { 'ingredients.$.quantity': quantity }
            },
            { new: true } // Return the updated document
        );

        if (!groceryItem) {
            return res.status(404).json({ message: "Grocery item not found or ingredient not found." });
        }

        console.log("Updated GroceryItem ingredient quantity!");
        res.status(200).json(groceryItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
