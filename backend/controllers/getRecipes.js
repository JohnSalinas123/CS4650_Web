
let testRecipe = 
[
    {
        "_id" : 1,
        "name": "Burger",
        "description" : "This is a burger recipe",
        "vegetarian" : false,
        "ingredients": [
            {
                "name": "Beef Patty",
                "category" : "protein",
            },
            {
                "name" : "Cheddar Cheese",
                "category" : "dairy"
            },
            {
                "name" : "Lettuce",
                "category": "vegetable"
            }
        ],
        "steps": [
            {
                "step_num": 1,
                "instruction": "Pan dry beef patty on stove until cooked to liking"
            },
            {
                "step_num": 2,
                "instruction": "Add cheddar cheese slice on cooking beef patty, remove patty when cheese is melted"
            }
        ]
    },
    {
        "_id" : 2,
        "name": "Pizza",
        "description" : "This is a pizza recipe",
        "ingredients": [
            {
                "name": "beef_patty",
                "category" : "protein",
            },
            {
                "name" : "cheddar_cheese",
                "category" : "dairy"
            },
            {
                "name" : "lettuce",
                "category": "vegetable"
            }
        ],
        "steps": [
            {
                "step_num": 1,
                "instruction": "Flatten dough into base of pizza"
            },
            {
                "step_num": 2,
                "instruction": "Spread tomato sauce on pizza dough base"
            }
        ]
    }
]


export const getRecipes = async (req, res) => {
    console.log("RECIPES")
    res.status(200).json(testRecipe);
};

/*
"steps": [
    {
        "step_num": 1,
        "instruction": "Pan dry beef patty on stove until cooked to liking"
    },
    {
        "step_num": 2,
        "instruction": "Add cheddar cheese slice on cooking beef patty, remove patty when cheese is melted"
    }
]
},
{
"_id" : 2,
"name": "Pizza",
"description" : "This is a pizza recipe",
"ingredients": [
    {
        "name": "beef_patty",
        "category" : "protein",
    },
    {
        "name" : "cheddar_cheese",
        "category" : "dairy"
    },
    {
        "name" : "lettuce",
        "category": "vegetable"
    }
],
"steps": [
    {
        "step_num": 1,
        "instruction": "Flatten dough into base of pizza"
    },
    {
        "step_num": 2,
        "instruction": "Spread tomato sauce on pizza dough base"
    }
]
}


*/