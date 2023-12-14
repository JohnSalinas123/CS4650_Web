import React, { useRef, useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';


export const Login = ( {setLoginState }) => {
	// user credentials
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');

	// alert message
	const [alert, setAlert] = useState('');

	useEffect(() => {

	}, [])

	// utils
	const navigate = useNavigate();
	const [loginMode, setLoginMode] = useState(true);

	// toggle between login/signup
	const toggleMode = () => {
		setLoginMode(loginMode ? false : true);
	};

	// handle change in user input
	const handleUserInputChange = (event) => {
		const eventID = event.target.id;

		switch (eventID) {
			case 'usernameInput':
				setUserName(event.target.value);
				break;
			case 'passwordInput':
				setPassword(event.target.value);
				break;
			case 'confirmInput':
				setConfirm(event.target.value);
				break;
			default:
				console.log('Unexpected error in input updating!');
		}
	};

	// login user
	const loginUser = async () => {
		
        const { data } = await axios.post('api/user/login', {
            username: username,
            password: password,
        });


			localStorage.setItem('Id', data.id)
			localStorage.setItem('username', data.username)
			console.log(data)

		setLoginState(true)


		setLoginState(true)

        navigate('/home', {
            replace: false,
            state: {
                id: data.id,
                username: username,
            },
        });
	};

	// sign up user
	const signUpUser = async () => {
        const { data } = await axios.post('api/user', {
            username: username,
            password: password,
        });

		localStorage.setItem('Id', data.id)
		localStorage.setItem('username', data.username)

		setLoginState(true)


        navigate('/home', {
            replace: false,
            state: {
                id: data.id,
                username: username,
            },
        });
		
	};

	// handle login or signup
	const handleLogin = () => {
		// check for empty fields
		if (username.length == 0 || password.length == 0 || (confirm.length == 0 && !loginMode)) {
			setAlert('All fields required.');
			return;
		} else if (password != confirm && !loginMode) {
			setAlert("Passwords don't match");
			return;
		}

		if (loginMode) {
			loginUser();
		} else {
			signUpUser();
		}
	};

	return (
		<div className='login-background d-flex justify-content-center align-items-center'>
			<Form className='rounded py-3 px-4'>
				<div className='mb-4 mt-2 login-title'>
					<p>{loginMode ? 'Login' : 'Sign up'}</p>
				</div>

				<div className='login-alert'>
					<p>{alert}</p>
				</div>

				<Form.Group className='mb-4' controlId='usernameInput'>
					<Form.Control placeholder='Username' onChange={handleUserInputChange} />
				</Form.Group>
				<FormGroup className='mb-4' controlId='passwordInput'>
					<FormControl type='password' placeholder='Password' onChange={handleUserInputChange} />
				</FormGroup>
				{!loginMode && (
					<Form.Group className='mb-3' controlId='confirmInput'>
						<FormControl
							type='password'
							placeholder='Confirm Password'
							onChange={handleUserInputChange}
						/>
					</Form.Group>
				)}

				<div className='mb-4 d-grid gap-2'>
					<Button variant='secondary' size='sm' onClick={handleLogin}>
						{loginMode ? 'Login' : 'Sign Up'}
					</Button>
				</div>

				<div className=' d-flex justify-content-center' onClick={toggleMode}>
					<p className='login-mode-switch'>
						{loginMode ? 'Create an account?' : 'Already have an account?'}
					</p>
				</div>
			</Form>
		</div>
	);
};
