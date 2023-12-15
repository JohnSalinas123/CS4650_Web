import MealPlan from '../models/mealPlanModel.js';

export const createUserMealPlan = async (req, res) => {
    
    const{ user, day, meal } = req.body

    console.log(user);
    console.log(day);
    console.log(meal);

    const query = {userID: user,
                   'meals.Date': day
                  }
    try{
        const result = await MealPlan.updateOne(query, 
                                {
                                 $set: {'meals.$.Meal': meal},  
                                },                          
                            );
        console.log(result);
    } catch (error){
        const newMealObject = {
            Date: day,
            Meal: meal
        }

        const result = await MealPlan.updateOne(
        { userID: user },
        { $push: { meals: newMealObject } }
        );
    }

}