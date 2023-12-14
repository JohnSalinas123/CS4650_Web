import mongoose from 'mongoose';

const GroceryListSchema = new mongoose.Schema({
    user_id: {
        type: String,  // Changed from ObjectId to String
        required: true,
    },
    ingredients: [{
        name: {type: String, required: true},
        quantity: {type: String, required: true},
        active: {type: Boolean, required: true}
    }]
});


export default mongoose.model('GroceryList', GroceryListSchema); 
