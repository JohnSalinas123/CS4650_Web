import mongoose, {Schema } from 'mongoose'

const RecipeIngredientsSchema = new Schema({
    ingredient_id: {type: Number, required: true},
    quantity: {type: String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: true}
})

const RecipeStepSchema = new Schema({
    step_num: {type: Number, required: true},
    instructions: {type: String, required: true}
})

const RecipeSchema = new Schema({
    name : {type: String, required: true},
    description: {type: String, required: true},
    calories : {type: Number, required: true},
    dietary_pref : {type: String, required: true},
    ingredients: [RecipeIngredientsSchema],
    steps: [RecipeStepSchema]
})





export default mongoose.model('Recipe', RecipeSchema)