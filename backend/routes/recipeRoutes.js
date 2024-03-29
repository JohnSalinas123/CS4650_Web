import express from 'express';
import { createRecipe } from '../controllers/createRecipe.js';
import { getRecipes } from '../controllers/getRecipes.js';

const router = express.Router();

// get: get all recipes
// post: create a recipe
router.get('/', getRecipes).post('/', createRecipe);

export default router;