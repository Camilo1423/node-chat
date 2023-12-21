import mongoose from "mongoose";


const chatSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Chats = new mongoose.model('chats', chatSchema)

export {
    Chats
}