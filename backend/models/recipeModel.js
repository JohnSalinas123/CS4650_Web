import mongoose, {Schema } from 'mongoose'

const RecipeIngredientsSchema = new Schema({
    index: {type: Number, required: true},
    name: {type: String, required: true},
    quantity: {type: String, required: true},
    unit: {type: String, required: true}
})

const RecipeStepSchema = new Schema({
    step_num: {type: Number, required: true},
    instructions: {type: String, required: true}
})

const RecipeSchema = new Schema({
    name : {type: String, required: true},
    description: {type: String, required: true},
    calories : {type: Number, required: true},
    diet : {type: String, required: true},
    ingredients: [RecipeIngredientsSchema],
    steps: [RecipeStepSchema]
})





export default mongoose.model('Recipe', RecipeSchema)