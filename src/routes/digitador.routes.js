import { Router } from 'express'
import { getDigitador,createDigitador,
updateDigitador,deleteDigitador,getDigitadorId } from '../controllers/digitador.controller.js'

const router = Router()

router.get('/digitador', getDigitador)

router.get('/digitador/:id', getDigitadorId)

router.post('/digitador', createDigitador)

router.patch('/digitador/:id', updateDigitador)

router.delete('/digitador/:id', deleteDigitador)

export default router