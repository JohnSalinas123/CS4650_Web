import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Card, CardGroup} from 'react-bootstrap';
import img1 from '../resources/pizza.jpg'; 

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
	
	return (
		<div className='container'>
			{meals.map((mealCat) =>(
					<div key={mealCat._id}>
						<h2>{mealCat.userID}'s Meal Plan</h2>
						<CardGroup>

							{mealCat.meals.map((meal) => (
								<Card key={meal.Date}>
									<Card.Body>
										<Card.Title>{meal.Date}</Card.Title>
										<Card.Text>
											{meal.Meal}
										</Card.Text>
									</Card.Body>
								</Card>
							))}
							
						</CardGroup>
					</div>
			))}
		</div>
	);
};
