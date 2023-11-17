import { Request, Response } from 'express';

// let testIngredients = [
//     {
        
//         "_id" : 1,
//         "name" : "Burger bun",
//         "category" : "carbohydrate",
//         "calories" : 200
//     },
//     {    
//         "_id" : 2,
//         "name" : "Burger Patty",
//         "category" : "protein",
//         "calories" : 150
//     },
//     {    
//         "_id" : 3,
//         "name" : "Tomato",
//         "category" : "vegetable",
//         "calories" : 20
//     },
//     {    
//         "_id" : 4,
//         "name" : "Cereal",
//         "category" : "carbohydrate",
//         "calories" : 150
//     },
//     {    
//         "_id" : 5,
//         "name" : "Milk",
//         "category" : "protein",
//         "calories" : 50
//     }
// ]

const schema = new mongoose.Schema({ id: int, name: String,catogory: String, calories: int });
const Ingredients = mongoose.model('Ingredients', schema);
export const createIngredients = async(req, res) => {
    console.log(req.body);
    const { id, name, category, calories} = req.body;

    console.log("Create Ingredient");
    
    // testIngredients[Object.keys(testIngredients).length +1] = {
    //     "_id" : id,
    //     "name" : name,
    //     "category" : category,
    //     "calories" : calories
    // };

    if (
		id == null ||
		name == null ||
		category == null ||
		calories == null
	) {
		res.status(406).json({ message: 'Error: Null fields!' });
	}

    if (name.length > 30) {
		res.status(406).json({ message: 'Error: Name too long!' });
	}

	const newIngredient = await await Ingredients.updateOne({ id: id }, { name: name }, { category: category }, { calories: calories });

	if (!newIngredient) {
		res.status(400).json({ message: 'Failed to create ingredient!' });
	}

	console.log('Ingredient created!');

	res.status(201).json({
		"_id" : id,
        	"name" : name,
        	"category" : category,
        	"calories" : calories
	});

};
