import express from 'express';
// TODO: create controllers
import { getIngredients } from '../controllers/getIngredients.js';
import { createIngredients } from '../controllers/createIngredient.js';

const router = express.Router();

// get: get all ingredients
// post: create a new ingredient
router.get('/', getIngredients).post('/', createIngredients);

export default router;