import { Router } from 'express'
import { recuperarContrasena } from '../controllers/service.controller.js'

const router = Router()

router.post('/msj', recuperarContrasena)

export default router