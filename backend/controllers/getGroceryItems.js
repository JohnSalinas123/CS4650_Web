import GroceryList from "../models/groceryListModel.js";
import GroceryItem from "../models/groceryItemModel.js";


export const getGroceryItems = async (req, res) => {
  console.log("Getting grocery items")

    try {
        const userId = req.params.userId; // Directly use the userId as a string
        console.log(userId)

        let groceryList = await GroceryList.findOne({ user_id: userId });

        if (!groceryList) {
            const newGroceryItem = new GroceryList({
                user_id: userId,
                active:true,
                ingredients: []
            });

            groceryList = newGroceryItem
        }

        const groceryItems = groceryList.ingredients;
        console.log(groceryList)
        console.log(groceryItems)
        
        res.status(200).json(groceryItems);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

