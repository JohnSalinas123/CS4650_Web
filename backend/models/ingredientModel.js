import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({ 
    name: String,
    category: String,
    calories: Number 
});

export default mongoose.model('Ingredient', ingredientSchema);


