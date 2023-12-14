import GroceryItem from "../models/groceryListModel.js"
export const deleteGroceryItem = async (req, res) => {
    try {
        const { userId, ingredientId } = req.params;

        const groceryItem = await GroceryItem.findOne({ user_id: userId });

        if (!groceryItem) {
            return res.status(404).json({ message: "Grocery item for user not found" });
        }

        const stringIngredientId = String(ingredientId);

        const originalLength = groceryItem.ingredients.length;
        groceryItem.ingredients = groceryItem.ingredients.filter(ingredient => ingredient.ingredient_id !== stringIngredientId);

        if (groceryItem.ingredients.length === originalLength) {
            return res.status(404).json({ message: "Ingredient not found in grocery item" });
        }

        await groceryItem.save();
        res.status(200).json({ message: "Ingredient removed successfully", groceryItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
