
testRecipe = {
    "name": "Burger",
    "description" : "This is a burger recipe",
    "ingredients": ["beef_patty", "cheddar_cheese", "lettuce"]
}

export const getRecipes = async (req, res) => {
	
		res.status(200).json(testRecipe);
};