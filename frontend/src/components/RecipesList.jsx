import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { RecipeListItem } from './RecipeListItem';
import { Row } from "react-bootstrap/Row";
import { Col } from "react-bootstrap/Col";

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
				console.log(recipe)
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
				<div className="scrollbar scrollbar-colored scrollbar-recipe-container mt-5 mx-auto">
					<Row>
						{recipes &&
						recipes.map((recipe) => (

							 <RecipeListItem key={recipe._id} 
							 	id={recipe._id} name={recipe.name} description={recipe.description} 
									ingredients={recipe.ingredients} steps={recipe.steps} cal={recipe.calories}/>
						))}
					</Row>
					
				</div>
		</div>
	);
};
