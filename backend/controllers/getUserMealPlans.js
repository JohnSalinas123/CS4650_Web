
import MealPlan from "../models/mealPlanModel.js";

export const getUserMealPlans = async(req, res) => {
    const username = req.query.userID;
    console.log(username)

    const allMealPlans = await MealPlan.find({userID: username});
    if (!allMealPlans.length){
        res.status(400).json()
    }
    else{
        res.status(200).json(allMealPlans)
    }
};