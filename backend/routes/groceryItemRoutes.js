//may no longer need anymore, left here incase. if still unused, then delete

import express from 'express';
import { createGroceryItem } from '../controllers/createGroceryItem.js';
import { getGroceryItems } from '../controllers/getGroceryItems.js';
import { deleteGroceryItem } from '../controllers/deleteGroceryItem.js'; 



const router = express.Router();
//router.use(express.json());

//dbConnect();

router.get('/groceryItems', getGroceryItems);
router.post('/groceryItems', createGroceryItem);
router.delete('/groceryItems/:itemId', deleteGroceryItem);

//const PORT = process.env.PORT || 4000;
/*
router.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

export default router;