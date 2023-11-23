import GroceryItem from "../models/groceryItemModel.js";

export const addGroceryItem = async (req, res) => {
    // Assume req.body has the structure { ingredient: { ingredient_id, name, quantity } }
    // and that req.params.userId contains the ObjectId of the user.
    const { userId } = req.params;
    const { ingredient } = req.body;

    try {
        // Find the GroceryItem document by userId
        const groceryItem = await GroceryItem.findOne({ user_id: userId });

        if (!groceryItem) {
            return res.status(404).json({ message: "GroceryItem not found for given user." });
        }

        // Add the new ingredient to the ingredients array
        groceryItem.ingredients.push(ingredient);

        // Save the updated document
        await groceryItem.save();

        console.log("Added new ingredient to GroceryItem!");
        res.status(200).json(groceryItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
