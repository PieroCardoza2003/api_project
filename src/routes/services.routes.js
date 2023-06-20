import { Router } from 'express'
import { recuperarContrasena,cambiarPassLogin,reporteRunner } from '../controllers/service.controller.js'

const router = Router()

router.post('/msj', recuperarContrasena)

router.post('/newpass', cambiarPassLogin)

router.get('/reporterunner', reporteRunner)


export default router