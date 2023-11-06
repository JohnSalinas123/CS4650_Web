import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express()
const port = 8080;

// connect to mongodb atlas
//dbConnect();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/api/user', userRoutes)
//app.use('/api/ingredients', ingredientRoutes)
//app.use('/api/recipes', recipeRoutes)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})



