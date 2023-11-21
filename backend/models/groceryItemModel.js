import mongoose from 'mongoose';


const groceryItemSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    active: {
        type: Boolean,
        required: true
    },
    ingredients: [{
        ingredient_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ingredient'
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});


const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

export default GroceryItem;
