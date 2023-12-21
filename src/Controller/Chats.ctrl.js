import { v4 as uuid } from "uuid"
import { Chats } from "../Models/Chats.model.js"

const generateToken = () => {
    const random = Math.random().toString(32).substring(2)
    const fecha = Date.now().toString(32)
    return random + fecha
}

const chatCreate = async (req, res) => {
    try {
        await Chats.create({ uuid: uuid(), name: generateToken() })
        return res.json({ status: 'success' })
    } catch {
        return res.status(404)
    }
}

const chatGet = async (req, res) => {
    try {
        const chats = await Chats.find()
        return res.json([ ...chats ])
    } catch {
        return res.status(404)
    }
}

export {
    chatCreate,
    chatGet
}