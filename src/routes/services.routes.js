import { Router } from 'express'
import { recuperarContrasena,cambiarPassLogin,reporteOrdenes } from '../controllers/service.controller.js'

const router = Router()

router.post('/msj', recuperarContrasena)

router.post('/newpass', cambiarPassLogin)

router.get('/reporteordenes', reporteOrdenes)


export default router