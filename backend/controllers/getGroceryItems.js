import GroceryItem from "../models/groceryItemModel.js";

const testGroceryItem = {
    "_id": "ObjectId('65580c9f0b88fdd372ee7513')",
    "user_id": 1,
    "active": true,
    "ingredients": [
      {
        "ingredient_id": 1,
        "name": "Burger Patty",
        "quantity": 2
      },
      {
        "ingredient_id": 2,
        "name": "Cheddar Cheese",
        "quantity": 2
      }
    ]
};
  

export const getGroceryItems = async (req, res) => {
        //const groceryItems = await GroceryItem.find({});
        res.status(200).json(testGroceryItem);
};
