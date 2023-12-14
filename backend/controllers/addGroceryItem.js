import GroceryList from "../models/groceryListModel.js";
import mongoose from 'mongoose'

export const addGroceryItem = async (req, res) => {
    // Assume req.body has the structure { ingredient: { ingredient_id, name, quantity } }
    // and that req.params.userId contains the ObjectId of the user.
    const { user_id , newGroceryItem} = req.body

    console.log(req.body)

    try {
        // Find the GroceryItem document by userId
        let usersGroceryList = await GroceryList.findOne({ user_id: user_id });

        console.log(usersGroceryList)

        const newGroceryItemId = new mongoose.Types.ObjectId()

        // Add the new ingredient to the ingredients array
        const newGroceryItemObj = {
            _id: newGroceryItemId,
            name: newGroceryItem.name,
            quantity: newGroceryItem.quantity,
            active: newGroceryItem.active

        }

        usersGroceryList.ingredients.push(newGroceryItemObj);

        // Save the updated document
        await usersGroceryList.save();

        console.log(`Added ${newGroceryItemObj.name} with _id ${newGroceryItemObj._id} to the grocery list for user ${user_id}.`);
        res.status(200).json({
            _id: newGroceryItemId,
            name: newGroceryItemObj.name,
            quantity: newGroceryItemObj.quantity,
            active: newGroceryItemObj.active
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
