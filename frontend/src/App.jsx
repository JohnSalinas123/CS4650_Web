import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Grocery } from './pages/Grocery';
import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import { Ingredients } from './pages/Ingredients';
import { Recipes } from './pages/Recipes';
import { MealPlans } from './pages/MealPlans';
import './styles/general.css';
import React, { useRef, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";


export function App() {

	const [loginState, setLoginState] = useState(localStorage.getItem("Id") ? true : false);


	
	const RouteGuard = ({children}) => {

		if (!loginState) {
			return <Navigate to={"/"} replace />
		}
		
		return children;
	}


	return (
		<div id='root-div'>

			<Navigation loginState={loginState} setLoginState={setLoginState}/>

			<Routes>
				<Route path='/' element={<Login setLoginState={setLoginState} />}></Route>
				<Route 
					path='/home' 
					element={
						<RouteGuard>
							<Home />
						</RouteGuard>
					}>
				</Route>
				<Route 
					path='/grocery' 
					element={
						<RouteGuard>
							<Grocery />
						</RouteGuard>
					}>		
				</Route>
				<Route 
					path='/ingredients' 
					element={
						<RouteGuard>
							<Ingredients />
						</RouteGuard>
					}>	
				</Route>

				<Route 
					path='/recipes' 
					element={
						<RouteGuard>
							<Recipes />
						</RouteGuard>
					}>
				</Route>
				<Route 
					path='/mealplans' 
					element={
						<RouteGuard>
							<MealPlans />
						</RouteGuard>
					}>
				</Route>

			</Routes>
		</div>
	);
}