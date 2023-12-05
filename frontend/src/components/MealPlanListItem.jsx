import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {Card, Button, Col, Modal} from 'react-bootstrap';
import img1 from '../resources/pizza.jpg'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mealplans.css';



export const MealPlanListItem = ({id, meal, date, formHandler, updatableText}) => {

	const [cardText, setCardText]  = useState(meal);
	
	useEffect(() => {
		setCardText(updatableText || meal);
	}, [updatableText, meal]);

	const createMeal = async () => {
		formHandler();
	};

	return (
		<Col key={id}>
			<Card key={id}>
				<div className='events'>
					<Card.Header as="h6">{date}</Card.Header>
					<div className='fade'> <Card.Img variant='top' src={img1}/> </div>
					<Card.Body className='fade'>
						<Card.Text>{cardText}</Card.Text>
					</Card.Body>

					<div className='middle'>
						<Button variant='success' onClick={createMeal}>Update Meal</Button>
					</div>
				</div>
			</Card>
		</Col>
		
	);
};