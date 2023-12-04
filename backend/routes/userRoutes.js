import express from 'express';
import { createUser } from '../controllers/createUser.js';
import { getUserMealPlans } from '../controllers/getUserMealPlans.js';
import { createUserMealPlan } from '../controllers/createUserMealPlan.js';
//import { loginUser } from '../controllers/loginUser.js';

const router = express.Router();


// post: create a user
router.post('/', createUser);

// post: login user
//router.post('/login', loginUser);

// get: retrieve user meal plans
// post: create user meal plan
router.get('/meals', getUserMealPlans)
router.post('/createMeal', createUserMealPlan);

export default router;