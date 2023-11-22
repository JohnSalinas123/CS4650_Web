import express from 'express';
import { createUser } from '../controllers/createUser.js';
import { getUserMealPlans } from '../controllers/getUserMealPlans.js';
import { getGroceryItems } from '../controllers/getGroceryItems.js';
//import { loginUser } from '../controllers/loginUser.js';

const router = express.Router();


// post: create a user
router.post('/', createUser);
// post: login user
//router.post('/login', loginUser);

//get: grocery items related to users object _Id
router.get('/getGroceryItem/:userId', getGroceryItems);

// get: retrieve user meal plans
// post: create user meal plan
router.get('/meals', getUserMealPlans)//.post('/meals', createUserMealPlan);

export default router;