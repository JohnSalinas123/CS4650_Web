import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/mealplans.css';

import {Card, Modal, Row} from 'react-bootstrap';
import { MealPlanListItem } from './MealPlanListItem';
import { BlankMealPlanItem } from './BlankMealPlanItem';
import { MealPlanForm } from './MealPlanForm';



axios.defaults.baseURL = 'http://localhost:8080';

export const MealPlansList = () => {
	
	const [meals, setMeals] = useState([])

	const [mealsData, setMealsData] = useState([
		{
			"Date":"Sunday",
			"Meal":""
		},
		{
			"Date":"Monday",
			"Meal":""
		},
		{
			"Date":"Tuesday",
			"Meal":""
		},
		{
			"Date":"Wednesday",
			"Meal":""
		},
		{
			"Date":"Thursday",
			"Meal":""
		},
		{
			"Date":"Friday",
			"Meal":""
		},
		{
			"Date":"Saturday",
			"Meal":""
		}
	]);

	const [showModal, setShowModal] = useState(false);
	const [selectDate, setSelectDate] = useState('');
	const [userUpdate, setUserUpdate] = useState('');
	const [newMealData, setNewMealData] = useState({ date: '', meal: '' });


	const updateMealsData = (date, meal) => {
		setMealsData((prevMealsData) => {
		  return prevMealsData.map((mealData) => {
			if (mealData.Date === date) {
			  return { ...mealData, Meal: meal };
			} else {
			  return mealData;
			}
		  });
		});
	  };

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

		updateMealsData(selectDate, newMeal);
		
	}
	useEffect(() => {
		getData();
	}, []); // end useEffect


	const getData = async () => {
		try {
			const { data } = await axios.get('api/user/meals', 
												{
													params: {userID: localStorage.getItem("username")}
												}
											);
			data.forEach((meal) => {
				setMeals((prevMeal) => [...prevMeal, meal]);
				meal.meals.forEach((dailyMeal) => {
					for (let i=0; i <mealsData.length; i++){
						const user_meal = mealsData[i];
						if (user_meal.Date === dailyMeal.Date){
							user_meal.Meal = dailyMeal.Meal;
							break;
						}
					}
				})
			});

			mealsData.forEach((meal_) =>{
				console.log(meal_)
			})
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
			{
				<div>
					<h2>{localStorage.getItem("username")}'s Meal Plan</h2>

					<Row>
						{mealsData.map((meal, index) => (
							meal.Meal === "" ?
							(
								<BlankMealPlanItem key={index}
								date={meal.Date}
								formHandler={() => formHandle(meal.Date, localStorage.getItem("username"))}
								/>
							) :
							(
							<MealPlanListItem key={index}
								id={meal.Date}
								meal={meal.Meal}
								date={meal.Date}
								formHandler = {() => formHandle(meal.Date, localStorage.getItem("username"))}
								updatableText = {newMealData.date === meal.Date ? newMealData.meal : ''}
							/>)
						))}
					</Row>
				</div>
			}
		</div>
	);
};
