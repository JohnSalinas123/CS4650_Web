let testUserMealPlan = [
    {
        "_id" : 1,
        "userID" : "John Doe",
        "meals" : [
            {
                "Date" : "Monday",
                "Meal" : "Recipie 1"
            },
            {
                "Date" : "Tuesday",
                "Meal" : "Recipie 2"
            },
            {
                "Date" : "Wednesday",
                "Meal" : "Recipie 3"
            },
            {
                "Date" : "Thursday",
                "Meal" : "Recipie 4"
            },
            {
                "Date" : "Friday",
                "Meal" : "Recipie 5"
            },
            {
                "Date" : "Saturday",
                "Meal" : "Recipie 6"
            },
            {
                "Date" : "Sunday",
                "Meal" : "Recipie 7"
            }
        ]
    }
]


export const getUserMealPlans = async(req, res) => {
    console.log("Get User Meal Plans")

    res.status(200).json(testUserMealPlan);
};