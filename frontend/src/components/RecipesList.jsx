import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { RecipeListItem } from './RecipeListItem';
import { RecipeForm } from './RecipesForm'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'

const ingredientsToString = (ingredient_list) => {

	//console.log(ingredient_list)

	let ingredient_array = []
	for (let i in ingredient_list) {
		ingredient_array.push(ingredient_list[i].name)

	}

	//console.log(ingredient_array)

	return (
		<div>
			{ingredient_array.join(", ")}
		</div>
	)

}


export const RecipesList = () => {
	const [recipes, setRecipes] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const recipesPerPage = 8
	const [showingForm, setShowingForm] = useState(false)

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
			//console.log(recipes);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCloseForm = () => setShowingForm(false);
  	const handleShowForm = () => setShowingForm(true);


	let indexOfLastRecipe = currentPage*recipesPerPage;
	let indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
	let currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

	let paginate = (pageNum) => setCurrentPage(pageNum)

	return (
		<div className='container'>
			<Row className="justify-content-md-center p-3">
				<Col xs lg="2">
				</Col>
				<Col md="auto">
					<h2 >Recipe List</h2>
				</Col>
				<Col xs lg="2">
					<Button className="recipe-add-button" onClick={handleShowForm}>
						Add Recipe
					</Button>
				</Col>
				
			</Row>
			
			<RecipeForm show={showingForm}  handleClose={handleCloseForm}/>

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
