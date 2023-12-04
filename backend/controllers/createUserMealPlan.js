import MealPlan from '../models/mealPlanModel.js'

export const createUserMealPlan = async (req, res) => {
    console.log("I am in create user meal plan")
    const{ user, day, meal } = req.body

    console.log(user);
    console.log(day);
    console.log(meal);

    const query = {userID: user,
                   'meals.Date': day
                  }
    // MealPlan.updateOne(query, {$set: {'meals.$.Meal': meal}})

}