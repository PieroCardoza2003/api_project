import { Router } from 'express'
import { getRunner,createRunner,
updateRunner,deleteRunner,getRunnerId, autenticarRunner, estadoRunner, cambiarPassRunner } from '../controllers/runner.controller.js'

const router = Router()

router.get('/runner', getRunner)

router.get('/runner/:id', getRunnerId)

router.post('/runner', createRunner)

router.post('/loginrunner', autenticarRunner)

router.post('/estadorunner/:id', estadoRunner)

router.post('/passrunner/:id', cambiarPassRunner)

router.patch('/runner/:id', updateRunner)

router.delete('/runner/:id', deleteRunner)

export default router