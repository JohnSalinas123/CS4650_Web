import mongoose from 'mongoose';

const GroceryListSchema = new mongoose.Schema({
    user_id: {
        type: String,  // Changed from ObjectId to String
        required: true,
    },
    ingredients: [{
        name: {type: String, required: true},
        quantity: {type: Number, required: true}
    }]
});




const GroceryList = mongoose.model('GroceryList', GroceryListSchema); 

export default GroceryList;
