import Ingredient from "../models/ingredientModel.js";


export const createIngredients = async(req, res) => {
    console.log(req.body);
    const { name, category, calories} = req.body;

    console.log("Create Ingredient");
	
    if (
		name == null ||
		category == null ||
		calories == null
	) {
		res.status(406).json({ message: 'Error: Null fields!' });
	}

    if (name.length > 30) {
		res.status(406).json({ message: 'Error: Name too long!' });
	}

	const newIngredient = await Ingredient.create({
		name : name,
		category: category,
		calories: calories
	});

	if (!newIngredient) {
		res.status(400).json({ message: 'Failed to create ingredient!' });
	}

	console.log('Ingredient created!');

	res.status(201).json({
        	"name" : name,
        	"category" : category,
        	"calories" : calories
	});

};