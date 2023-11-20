import mongoose, {Schema } from 'mongoose'

const MealsSchema = new Schema({
    Date: {type: String, required: true},
    Meal: {type: String, required: true}
})

const MealPlanSchema = new Schema({
    userID : {type: String, required: true},
    meals: [MealsSchema]
})

export default mongoose.model('MealPlan', MealPlanSchema)