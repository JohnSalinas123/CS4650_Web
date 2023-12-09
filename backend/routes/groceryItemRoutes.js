
import express from 'express';
import { createGroceryItem } from '../controllers/createGroceryItem.js';
import { getGroceryItems } from '../controllers/getGroceryItems.js';
import { deleteGroceryItem } from '../controllers/deleteGroceryItem.js'; 
import { addGroceryItem } from '../controllers/addGroceryItem.js';
import { updateGroceryItem } from '../controllers/updateGroceryItem.js';



const router = express.Router();


//get: grocery items related to users object _Id
router.get('/getGroceryItem/:userId', getGroceryItems);
// post: creating a new grocery item
router.post('/createGroceryItems', createGroceryItem);
//delete: delete ingrediant from groceryitems using ingrediant id
//router.delete('/groceryItems/:itemId', deleteGroceryItem);
router.delete('/deleteGroceryItem/:userId/ingredient/:ingredientId', deleteGroceryItem);
//post: addGroceryItem
router.post('/addGroceryItem/:userId', addGroceryItem);
// update
router.patch('/updateGroceryItem/:userId', updateGroceryItem);


export default router;