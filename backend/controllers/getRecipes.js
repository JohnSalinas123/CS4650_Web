import { testRecipe } from "../mock_recipes_data.js";


export const getRecipes = async (req, res) => {
    console.log("RECIPES")
    res.status(200).json(testRecipe);
};

