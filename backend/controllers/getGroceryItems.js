import GroceryList from "../models/groceryListModel.js";


export const getGroceryItems = async (req, res) => {
  console.log("Getting grocery items")

    try {
        const userId = req.params.userId; // Directly use the userId as a string
        console.log(userId)

        let groceryList = await GroceryList.findOne({ user_id: userId });

        if (!groceryList) {
            console.log("GROCERY LIST IS NULL")
        }

        if (groceryList.ingredients == null) {
            res.status(200).json({message: "grocery list is empty"})
        }
        const groceryItems = groceryList.ingredients;
        //console.log(groceryList)
        //console.log(groceryItems)
        
        res.status(200).json(groceryItems);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
};

