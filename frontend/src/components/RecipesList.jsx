import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { RecipeListItem } from './RecipeListItem';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Pagination from 'react-bootstrap/Pagination'

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
	const [currentPage, setCurrentPage] = useState(1)
	const recipesPerPage = 8;

	useEffect(() => {
		// function is called after rendering
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

	let indexOfLastRecipe = currentPage*recipesPerPage;
	let indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
	let currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

	let paginate = (pageNum) => setCurrentPage(pageNum)

	return (
		<div className='container'>
			<h2 className='p-3 text-center'>Recipe List</h2>
				<div className='recipe-list-container'>
					<Pagination className='recipe-pagination'>
						{Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }).map((_, index) => (
						<Pagination.Item
						key={index + 1}
						active={index + 1 === currentPage}
						onClick={() => paginate(index + 1)}
						>
						{index + 1}
						</Pagination.Item>
						))}
					</Pagination>
					<Row>
						{currentRecipes &&
							currentRecipes.map((recipe) => (
								<RecipeListItem key={recipe._id} 
									id={recipe._id} name={recipe.name} description={recipe.description} 
										ingredients={ingredientsToString(recipe.ingredients)} steps={recipe.steps} cal={recipe.calories}/>
							))}
					</Row>
				</div>
		</div>
	);
};
