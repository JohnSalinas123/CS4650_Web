import Ingredient from "../models/ingredientModel.js";

export const getIngredients = async(req, res) => {

    const ingredientData = await Ingredient.find();
    if(!ingredientData.length){
        res.status(400).json()
    }
    else{
        console.log("Load Ingredients")
        res.status(200).json(ingredientData);
    }
    
};