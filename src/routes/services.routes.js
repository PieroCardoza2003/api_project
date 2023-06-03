import { Router } from 'express'
import { recuperarContrasena,cambiarPassLogin,pruebaMail } from '../controllers/service.controller.js'

const router = Router()

router.post('/msj', recuperarContrasena)

//eliminarrrr
router.post('/pruebamail', pruebaMail)

router.post('/newpass', cambiarPassLogin)


export default router