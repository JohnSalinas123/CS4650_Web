import GroceryList from "../models/groceryListModel.js";
import GroceryItem from "../models/groceryItemModel.js";

export const addGroceryItem = async (req, res) => {
    // Assume req.body has the structure { ingredient: { ingredient_id, name, quantity } }
    // and that req.params.userId contains the ObjectId of the user.
    const { user_id , newGroceryItem} = req.body

    console.log(req.body)

    try {
        // Find the GroceryItem document by userId
        let usersGroceryList = await GroceryList.findOne({ user_id: user_id });

        console.log(usersGroceryList)

        // Add the new ingredient to the ingredients array
        usersGroceryList.ingredients.push(newGroceryItem);

        // Save the updated document
        await usersGroceryList.save();

        console.log(`Added ${newGroceryItem.name} to the grocery list for user ${user_id}.`);
        res.status(200).json(newGroceryItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
