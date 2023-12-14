import express from 'express';
import { createUser } from '../controllers/createUser.js';
import { getUserMealPlans } from '../controllers/getUserMealPlans.js';
import { loginUser } from '../controllers/loginUser.js';

import { createGroceryList } from '../controllers/createGroceryList.js';
import { getGroceryItems } from '../controllers/getGroceryItems.js';
import { deleteGroceryItem } from '../controllers/deleteGroceryItem.js'; 
import { addGroceryItem } from '../controllers/addGroceryItem.js';
import { updateGroceryItem } from '../controllers/updateGroceryItem.js';
import { clearGroceryList } from '../controllers/clearGroceryList.js';


const router = express.Router();


// post: create a user
router.post('/', createUser);
// post: login user
router.post('/login', loginUser);

// post: add grocery item to specific user's grocery list
router.post('/grocery', addGroceryItem)

// put: update the active state of an item in a user's grocery list
router.put('/grocery', updateGroceryItem);

//get: grocery items related to users object _Id
router.get('/grocery/:userId', getGroceryItems);

// delete: deleting a certain ingredient in a user's grocery list;
router.delete('/grocery/:userId/ingredient/:ingredientId', deleteGroceryItem);

// delete: clear a user's grocery list
router.delete('/grocery/:userId', clearGroceryList)


// get: retrieve user meal plans
// post: create user meal plan
router.get('/meals', getUserMealPlans)//.post('/meals', createUserMealPlan);

export default router;