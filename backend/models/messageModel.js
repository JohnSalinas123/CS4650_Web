import mongoose, { Shema } from 'mongoose';

const MessageSchema = new Schema({
    username: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now},
})

export default mongoose.model('Message', MessageSchema);