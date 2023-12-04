import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mealplans.css';

import {Card, Button, Row, Col} from 'react-bootstrap';
import img1 from '../resources/pizza.jpg'; 

import { data_To_Card } from './MealPlanListItem';

axios.defaults.baseURL = 'http://localhost:8080';



export const MealPlansList = () => {
	const [meals, setMeals] = useState([])

	useEffect(() => {
		// function is called after rendering map
		getData();
	}, []); // end useEffect

	const getData = async () => {
		try {
			const { data } = await axios.get('api/user/meals');
			data.forEach((meal) => {
				// for loop inserts each recipe into array
				setMeals((prevMeal) => [...prevMeal, meal]); // add new recipe to end of array
			});
			console.log(meals);
		} catch (err) {
			console.error(err);
		}
	};
	
	const createMeal = async () => {
		const { data } = await axios.post('api/user/createMeal',
		{
			user: "Bob",
			day: "Monday",
			meal: "Bread"
		});

	};

	var mealData = {
		meals : []
	};
	for (var i in meals){
		if (i.userID == "John Doe"){
			var mealsByDate = meals[i].meals;
			console.log('here')
		}
	}
	
	return (
		<div className='container'>
			{meals.map((mealCat) =>(
					<div key={mealCat._id}>
						<h2>{mealCat.userID}'s Meal Plan</h2>

						<Row xs={7} md={7} className='justify-content-md-center p-3'>

							{mealCat.meals.map((meal, index) => (
								data_To_Card(meal, index)
							))}

							
							<Button variant='success' onClick={createMeal}>
								Create
							</Button>

						</Row>
					</div>
			))}
		</div>
	);
};
