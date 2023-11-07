import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import './styles/general.css';

export function App() {
	return (
		<div id='root-div'>
			<Navigation />

			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/login' element={<Login />}></Route>

			</Routes>
		</div>
	);
}