import React, {useEffect, useState} from 'react';

import {Card, Button, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mealplans.css';



export const BlankMealPlanItem = ({id, date, formHandler}) => {

	const createMeal = async () => {
		formHandler();
	};

	return (
		<Col key={id}>
			<Button variant='success' onClick={createMeal}>Update Meal</Button>
		</Col>
		
	);
};