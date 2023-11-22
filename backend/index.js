import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import groceryItemRoutes from './routes/groceryItemRoutes.js';
import {dbConnect} from './dbConnect.js'

const app = express()
const port = 8080;

// connect to mongodb atlas
dbConnect();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
    res.send({"Working" : "Yes"})
})

app.use('/api/user', userRoutes)
//app.use('/api/user/getGroceryItem', userRoutes) not needed, handeled in userRoutes

//app.use('/api/ingredients', ingredientRoutes)
//app.use('/api/recipes', recipeRoutes)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})



