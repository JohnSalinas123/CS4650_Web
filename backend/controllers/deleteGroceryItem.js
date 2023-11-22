import GroceryItem from "../models/groceryItemModel.js";


export const deleteGroceryItem = async (req, res) => {
    try {
        const { groceryItemId, ingredientId } = req.params;
        // Find the grocery item by ID
        const groceryItem = await GroceryItem.findById(groceryItemId);

        if (!groceryItem) {
            return res.status(404).json({ message: "Grocery item not found" });
        }

        // Filter out the ingredient to be deleted
        groceryItem.ingredients = groceryItem.ingredients.filter(ingredient => ingredient._id.toString() !== ingredientId);

        // Save the grocery item
        await groceryItem.save();
        res.status(200).json({ message: "Ingredient removed successfully", groceryItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
