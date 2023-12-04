import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mealplans.css';

import {Card, Button, Row, Col} from 'react-bootstrap';
import img1 from '../resources/pizza.jpg'; 

export const data_To_Card = (meal, index) => {
	return (
		<Col key={meal.Date}>
			<Card key={meal.Date}>

				<div className='events'>
					<Card.Header as="h6">{meal.Date}</Card.Header>
					<div className='fade'>
						<Card.Img variant='top' src={img1}/>
					</div>
					<Card.Body className='fade'>
						<Card.Text >
							{meal.Meal}
						</Card.Text>
					</Card.Body>
					<div className='middle'>
						<Button variant='danger'>
							Remove Meal
						</Button>
					</div>

				</div>
			</Card>
		</Col>
	);
}