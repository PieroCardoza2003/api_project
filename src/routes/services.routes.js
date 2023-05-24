import { Router } from 'express'
import { sendMenssaje } from '../controllers/service.controller'

const router = Router()

router.post('/msj', sendMenssaje)

export default router