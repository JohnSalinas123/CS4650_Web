import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);