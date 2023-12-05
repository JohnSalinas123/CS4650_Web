import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Grocery } from './pages/Grocery';
import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import { Ingredients } from './pages/Ingredients';
import { Recipes } from './pages/Recipes';
import { MealPlans } from './pages/MealPlans';
import './styles/general.css';


export function App() {
	return (
		<div id='root-div'>
			<Navigation />

			<Routes>
				<Route path='/home' element={<Home />}></Route>
				<Route path='/' element={<Login />}></Route>
				<Route path='/grocery' element={<Grocery />}></Route>
				<Route path='/ingredients' element={<Ingredients />}></Route>
				<Route path='/recipes' element={<Recipes />}></Route>
				<Route path='/mealplans' element={<MealPlans />}></Route>

			</Routes>
		</div>
	);
}