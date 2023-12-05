import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mealplans.css';

import {Modal, Row} from 'react-bootstrap';
import { MealPlanListItem } from './MealPlanListItem';
import { MealPlanForm } from './MealPlanForm';



axios.defaults.baseURL = 'http://localhost:8080';

export const MealPlansList = () => {
	const [meals, setMeals] = useState([])
	const [showModal, setShowModal] = useState(false);
	const [selectDate, setSelectDate] = useState('');
	const [userUpdate, setUserUpdate] = useState('');
	const [newMealData, setNewMealData] = useState({ date: '', meal: '' });

	const formHandle = (date1, user) => {
		setSelectDate(date1);
		setUserUpdate(user);

		setShowModal(!showModal);
	}
	const handleFormSubmit = async (newMeal) => {
		setNewMealData({ date: selectDate, meal: newMeal });
		const { data } = await axios.post('api/user/createMeal',
		{
			user: userUpdate,
			day: selectDate,
			meal: newMeal
		});
	}
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
		} catch (err) {
			console.error(err);
		}
	};
	

	return (
		<div className='vh-100 d-flex align-items-center justify-content-center p-4'>
			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>{selectDate}'s New Meal Will Be ...</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MealPlanForm onSubmit={handleFormSubmit} />
				</Modal.Body>
			</Modal>
			{meals.map((mealCat) =>(
					<div key={mealCat._id}>
						<h2>{mealCat.userID}'s Meal Plan</h2>

						<Row>
							{mealCat.meals.map((meal, index) => (
								<MealPlanListItem key={index}
									id={meal.Date}
									meal={meal.Meal}
									date={meal.Date}
									formHandler = {() => formHandle(meal.Date, mealCat.userID)}
									updatableText = {newMealData.date === meal.Date ? newMealData.meal : ''}
								/>
							))}
						</Row>
					</div>
			))}
		</div>
	);
};
