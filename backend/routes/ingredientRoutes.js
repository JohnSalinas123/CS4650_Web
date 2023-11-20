import express from 'express';
// TODO: create controllers
import { getIngredients } from '../controllers/getIngredients';
import { createIngredients } from '../controllers/createIngredient.js';

const router = express.Router();

// get: get all ingredients
// post: create a new ingredient
router.get('/', getIngredients).post('/', createIngredients);
//post('/', createIngredient);

export default router;