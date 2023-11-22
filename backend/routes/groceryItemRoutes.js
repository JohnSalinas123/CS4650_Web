import express from 'express';
import { createGroceryItem } from '../controllers/createGroceryItem.js';
import { getGroceryItems } from '../controllers/getGroceryItems.js';


const router = express.Router();
router.use(express.json());

//dbConnect();

router.get('/groceryitems', getGroceryItems).post('/groceryitems', createGroceryItem);

//const PORT = process.env.PORT || 4000;
/*
router.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

export default router;