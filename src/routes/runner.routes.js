import { Router } from 'express'
import { getRunner,createRunner,
updateRunner,deleteRunner,getRunnerId } from '../controllers/runner.controller.js'

const router = Router()

router.get('/runner', getRunner)

router.get('/runner/:id', getRunnerId)

router.post('/runner', createRunner)

router.patch('/runner/:id', updateRunner)

router.delete('/runner/:id', deleteRunner)

export default router