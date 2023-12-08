import Message from '../models/messageModel.js'

export const getMessages = async (req, res) => {
    //TODO: implement message pagination, maybe using mongoose-paginate-v2
    const allMessages = await Message.find();

    if (!allMessages.length) {
        res.status(400).json()
    } else {
        console.log("Got Recipes!")
        res.status(200).json(allMessages)
    }
}