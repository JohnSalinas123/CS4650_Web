import User from '../models/userModel.js';
import bcrypt from 'bcrypt'

export const loginUser = async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username: username });
	if (!user || user.username !== username) {
		res.status(406).json({ message: 'Error: Username does not exist!' });
	} else {
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			res.status(406).json({ message: 'Error: Wrong password!' });
		} else {
			console.log('Successfully logged in!');
			res.status(201).json({
				id: user.id,
				username: user.username,
			});
		}
	}
};