import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

const ingredientsToString = (ingredient_list) => {

	console.log(ingredient_list)

	let ingredient_array = []
	for (let i in ingredient_list) {
		ingredient_array.push(ingredient_list[i].name)

	}

	console.log(ingredient_array)

	return (
		<div>
			{ingredient_array.join(", ")}
		</div>
	)

}



export const RecipesList = () => {
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		// function is called after rendering map
		getData();
	}, []); // end useEffect

	const getData = async () => {
		try {
			const { data } = await axios.get('api/recipes');
			data.forEach((recipe) => {
				// for loop inserts each recipe into array
				setRecipes((prevRecipe) => [...prevRecipe, recipe]); // add new recipe to end of array
			});
			console.log(recipes);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='container'>
			<h3 className='p-3 text-center'>Recipe List</h3>
			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Vegetarian</th>
						<th>Ingredients</th>
					</tr>
					
				</thead>
					{recipes &&
						recipes.map((recipe) => (
							<tbody key={recipe._id}>

								<tr >
									<td>{recipe.name}</td>
									<td>{recipe.description}</td>
									<td>{recipe.vegetarian ? "Yes" : "No"}</td>
									<td>{ingredientsToString(recipe.ingredients)}</td>
								</tr>
								<tr >
									{recipe.steps.map((step) => (
										<div key={step.step_num}>
											{`${step.step_num}. ${step.instruction}`}
										</div>
									))}
								</tr>
							</tbody>
						))}
			</table>
		</div>
	);
};
