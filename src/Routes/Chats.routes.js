import { Router } from 'express'
import { chatCreate, chatGet } from '../Controller/Chats.ctrl.js'

const route = Router()

route.post('/create', chatCreate)
route.get('/getall', chatGet)


export default route