
import Recipe from "../models/recipeModel.js";


export const getRecipes = async (req, res) => {
    const allRecipes = await Recipe.find();

    if (!allRecipes.length) {
        res.status(400).json()
    } else {
        console.log("Got Recipes!")
        res.status(200).json(allRecipes);
    }

};

