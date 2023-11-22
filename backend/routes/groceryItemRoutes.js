//may no longer need anymore, left here incase. if still unused, then delete

import express from 'express';
import { createGroceryItem } from '../controllers/createGroceryItem.js';
import { getGroceryItems } from '../controllers/getGroceryItems.js';


const router = express.Router();
//router.use(express.json());

//dbConnect();

router.get('/groceryItems', getGroceryItems);
router.post('/groceryItems', createGroceryItem);

//const PORT = process.env.PORT || 4000;
/*
router.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

export default router;