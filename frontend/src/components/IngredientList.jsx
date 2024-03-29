import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/ingredient.css";
import "../styles/general.css";

import {IngredientForm} from './IngredientForm';
import carb from '../resources/carb_ingredient.png';
import protein from '../resources/protein_ingredient.png';
import fat from '../resources/fat_ingredient.png';
import vege from '../resources/vege_ingredient.png';
import fruit from '../resources/fruit_ingredient.png';
import random from '../resources/defualt_ingredient.png';
import addButton from '../resources/addButton.png';

axios.defaults.baseURL = 'http://localhost:8080/';

export const IngredientsList = () => {
	const [ingredients, setIngredients] = useState([]);
	const [showingForm, setShowingForm] = useState(false)


	useEffect(() => {
		getData();
	}, []);
		
	const getData = async () => {
		try{
			// const {ingredientArr} = axios.get('api/ingredients')
			// .then(response => setIngredients(response.data))
			// .catch(error => console.error(error));
	
			const response = await axios.get('api/ingredients');
			setIngredients(response.data);
		}catch(err){
			console.error(err);
		}

	}
	const handleShowForm = () => setShowingForm(true);
	const handleCloseForm = () => setShowingForm(false);

	return (
		<>
			<button class="add" onClick={handleShowForm}><img src={addButton} width={30} height={30}/></button>
			<div class="grid-container">
				{ingredients.map(ingredients => (
					<div class="item-container" key={ingredients._id}>
						<IngredientImg type={ingredients.category}/>
						<h3 class="name">{ingredients.name}</h3>
						<p class="courier">{ingredients.category}</p>
						<p class="courier">{ingredients.calories} kcal/100g</p>
					</div>
				))}


			</div>

			<IngredientForm show={showingForm} handleClose={handleCloseForm} />
			<p class="end-prompt">You Reach The End</p>
		</>
	
	);
}

const IngredientImg = (props) => {

	let img = ""

	switch (props.type){
		case 'Carbohydrate' :
			img = carb;
		break;
		case 'Protein' :
			img = protein;
			break;
		case 'Vegetable' :
			img = vege
			break;
		case 'Fat' :
			img = fat;
			break;
		case 'Fruit' :
			img = fruit;
			break;
		default : 
			img = random;
	}

	console.log(img)

	return (
		<img src={img} height = {200} width = {200}></img>
	)
}
