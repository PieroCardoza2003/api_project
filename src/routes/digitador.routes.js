import { Router } from 'express'
import { getDigitador,createDigitador,
updateDigitador,deleteDigitador,getDigitadorId, autenticarDigitador } from '../controllers/digitador.controller.js'

const router = Router()

router.get('/digitador', getDigitador)

router.get('/digitador/:id', getDigitadorId)

router.post('/digitador', createDigitador)

router.post('/logindigitador', autenticarDigitador)

router.patch('/digitador/:id', updateDigitador)

router.delete('/digitador/:id', deleteDigitador)

export default router