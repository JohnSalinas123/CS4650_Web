
import MealPlan from "../models/mealPlanModel.js";

export const getUserMealPlans = async(req, res) => {
    
    const allMealPlans = await MealPlan.find();
    if (!allMealPlans.length){
        res.status(400).json()
    }
    else{
        console.log("Got Meal Plans")
        res.status(200).json(allMealPlans)
    }
};