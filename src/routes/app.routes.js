import { Router } from 'express'
import { getApp, getAppActivas, createApp, deleteApp, updateApp } from '../controllers/app.controller.js'

const router = Router()

router.get('/app', getApp)

router.post('/app', createApp)

router.patch('/app/:id', updateApp)

router.delete('/app/:id', deleteApp)

export default router