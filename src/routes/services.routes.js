import { Router } from 'express'
import { recuperarContrasena,cambiarPassLogin } from '../controllers/service.controller.js'

const router = Router()

router.post('/msj', recuperarContrasena)

router.post('/newpass', cambiarPassLogin)


export default router