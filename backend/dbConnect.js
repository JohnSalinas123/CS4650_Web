// connect to mongo db
import mongoose from 'mongoose';


export const dbConnect = async () => {
    var PORT=4000
    var MONGO_URI="mongodb+srv://root:root@cluster0.ualwad1.mongodb.net/pantry_pal_db"
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to Database")
    })
    .catch((error) => {
        console.log(error)
    })
};

