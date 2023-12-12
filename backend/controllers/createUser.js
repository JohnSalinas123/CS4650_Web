import User from '../models/userModel.js';

import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
	const { username, password } = req.body;

	console.log(username);

	// check for any missing fields
    
	if (username == null || password == null) {
		res.status(406).json({ message: 'Error: Null fields!' });
	}

	// check for length of fields
	else if (username.length == 0 || password.length == 0) {
		res.status(406).json({ message: 'Error: Empty fields!' });
	}

	// check for length of name
	else if (username.length > 20) {
		res.status(406).json({ message: 'Error: Username is too long!' });
	}

	else {
		// check if username is already in use
		const user = await User.findOne({ username: username });
		if (user) {
			res.status(406).json({ message: 'Error: Username already exists!' });
		} else {
			const salt = await bcrypt.genSalt(10);

			const hashedPassword = await bcrypt.hash(password, salt);
			// attempt to create new user
			const newUser = await User.create({
				username,
				password: hashedPassword,
			});

			// failed to create user
			if (!newUser) {
				res.status(400).json({ message: 'Failed to create user!' });
			}

			console.log('User created!');
			// user created, returning user id and username
			res.status(201).json({
				id: newUser.id,
				username: newUser.username,
			});
		}
	}
};
