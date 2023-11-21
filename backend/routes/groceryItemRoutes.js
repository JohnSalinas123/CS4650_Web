import express from 'express';
import { createGroceryItems } from '../controllers/createGroceryItems';
import { getGroceryItems } from './controllers/getGroceryItems';

const app = express();
app.use(express.json());

dbConnect();

app.get('/groceryitems', getGroceryItems);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
