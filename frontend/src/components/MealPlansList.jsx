import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mealplans.css';

import {Card, Button, Row, Col} from 'react-bootstrap';
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

						<Row xs={7} md={7} className='justify-content-md-center p-3'>

							{mealCat.meals.map((meal, index) => (
								<Col key={index}>
									<Card key={meal.Date}>
										<Card.Header as="h6">{meal.Date}</Card.Header>

										<div className='events'>
											<Card.Img variant='top' src={img1}/>
											<Button variant='success' className='invis-button'>
												Add
											</Button>
										</div>

										<Card.Body>
											<Card.Text >
												{meal.Meal}
											</Card.Text>
											<Button variant='success'>
												Update
											</Button>
										</Card.Body>
										
									</Card>
								</Col>
							))}
						
						</Row>
					</div>
			))}
		</div>
	);
};
