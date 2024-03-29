import User from '../models/userModel.js';
import GroceryList from '../models/groceryListModel.js';

import MealPlan from '../models/mealPlanModel.js';

import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
	const { username, password } = req.body;

	console.log(username);

	// check for any missing fields
    
	if (username == null || password == null) {
		res.status(406).json({ message: 'Error: Null fields!' });
	}

	// check for length of fields
	else if (username.length == 0 || password.length == 0) {
		res.status(406).json({ message: 'Error: Empty fields!' });
	}

	// check for length of name
	else if (username.length > 20) {
		res.status(406).json({ message: 'Error: Username is too long!' });
	}

	else {
		// check if username is already in use
		const user = await User.findOne({ username: username });
		if (user) {
			res.status(406).json({ message: 'Error: Username already exists!' });
		} else {
			const salt = await bcrypt.genSalt(10);

			const hashedPassword = await bcrypt.hash(password, salt);
			// attempt to create new user
			const newUser = await User.create({
				username,
				password: hashedPassword,
			});

			// failed to create user
			if (!newUser) {
				res.status(400).json({ message: 'Failed to create user!' });
			}

			console.log(`New user ${newUser._id} created!`);
			
			// create empty grocery list for new user
			const newGroceryList = await GroceryList.create({
                user_id: newUser._id,
                ingredients: []
            });

			if (!newGroceryList) {
				res.status(400).json({message: 'Failed to create grocery list for new user!'})
			}

			console.log(`Grocery list for user ${newUser._id} created`)


			console.log('User created!');

			const newMealPlan = await MealPlan.create({
				userID: newUser.username,
				meals: [
					{
						"Date":"Sunday",
						"Meal":"Empty"
					},
					{
						"Date":"Monday",
						"Meal":"Empty"
					},
					{
						"Date":"Tuesday",
						"Meal":"Empty"
					},
					{
						"Date":"Wednesday",
						"Meal":"Empty"
					},
					{
						"Date":"Thursday",
						"Meal":"Empty"
					},
					{
						"Date":"Friday",
						"Meal":"Empty"
					},
					{
						"Date":"Saturday",
						"Meal":"Empty"
					}
				]
			})
			if (!newMealPlan){
				res.status(400).json({message: "Failed to create meal plan for new user"})
			}
			// user created, returning user id and username
			res.status(201).json({
				id: newUser.id,
				username: newUser.username,
			});
		}
	}
};
