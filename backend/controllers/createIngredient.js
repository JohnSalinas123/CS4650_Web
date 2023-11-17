let testIngredients = [
    {
        
        "_id" : 1,
        "name" : "Burger bun",
        "category" : "carbohydrate",
        "calories" : 200
    },
    {    
        "_id" : 2,
        "name" : "Burger Patty",
        "category" : "protein",
        "calories" : 150
    },
    {    
        "_id" : 3,
        "name" : "Tomato",
        "category" : "vegetable",
        "calories" : 20
    },
    {    
        "_id" : 4,
        "name" : "Cereal",
        "category" : "carbohydrate",
        "calories" : 150
    },
    {    
        "_id" : 5,
        "name" : "Milk",
        "category" : "protein",
        "calories" : 50
    }
]


export const getIngredients = async(req, res) => {
    const { id, name, category, calories} = req.body;

    testIngredients[Object.keys(testIngredients).length +1] = {
        "_id" : id,
        "name" : name,
        "category" : category,
        "calories" : calories
    };

    res.status(200).json(testIngredients);
};