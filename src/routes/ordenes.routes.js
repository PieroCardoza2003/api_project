import { Router } from 'express'
import { ordenDisponible, ordenenRuta, ordentomada } from '../controllers/ordenes.controller.js'
import { broadcastOT,broadcastOD, broadcastOR } from '../socket/websocket.js';

const router = Router()


router.post('/ordendisponible', ordenDisponible, broadcastOD)

router.post('/ordentomada', ordentomada, broadcastOT)

router.post('/ordenenruta', ordenenRuta, broadcastOR)


export default router