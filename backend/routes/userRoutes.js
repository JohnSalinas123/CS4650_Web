import express from 'express';
import { createUser } from '../controllers/createUser.js';
import { getUserMealPlans } from '../controllers/getUserMealPlans.js';
import { getGroceryItems } from '../controllers/getGroceryItems.js';
import { createGroceryItem } from '../controllers/createGroceryItem.js';
import { deleteGroceryItem } from '../controllers/deleteGroceryItem.js'; 
import { addGroceryItem } from '../controllers/addGroceryItem.js';
//import { loginUser } from '../controllers/loginUser.js';

const router = express.Router();


// post: create a user
router.post('/', createUser);
// post: login user
//router.post('/login', loginUser);

//get: grocery items related to users object _Id
router.get('/getGroceryItem/:userId', getGroceryItems);
// post: creating a new grocery item
router.post('/createGroceryItems', createGroceryItem);
//delete: delete ingrediant from groceryitems using ingrediant id
//router.delete('/groceryItems/:itemId', deleteGroceryItem);
router.delete('/deleteGroceryItem/:userId/ingredient/:ingredientId', deleteGroceryItem);
//post: addGroceryItem
router.post('/addGroceryItem/:userId', addGroceryItem);

// get: retrieve user meal plans
// post: create user meal plan
router.get('/meals', getUserMealPlans)//.post('/meals', createUserMealPlan);

export default router;