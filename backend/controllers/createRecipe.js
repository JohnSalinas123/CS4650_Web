import Recipe from "../models/recipeModel.js";

export const createRecipe = async (req, res) => {
    console.log(req.body)

    const {
        name,
        description,
        calories,
        diet,
        ingredients,
        steps
    } = req.body

    ingredients = {}
    for

    console.log("Creating recipe!")

    const newRecipe = await Recipe.create({
        name: name,
        description: description,
        calories: calories,
        diet: diet,
        ingredients: ingredients,
        steps: steps
    })

    if (!newRecipe) {
        res.status(400).json({message: "Failed to create recipe!"})
    }

    console.log("Recipe created!")

    res.status(201).json({
        id: newRecipe.id,
        name: newRecipe.name
    })

}