import { Router } from 'express'
import { ordenDisponible, ordenenRuta, ordentomada,eliminaOrdenRunner, cancelaOrdenTomadaRunner } from '../controllers/ordenes.controller.js'
import { broadcastOT,broadcastOD, broadcastOR } from '../socket/websocket.js';

const router = Router()


router.post('/ordendisponible', ordenDisponible, broadcastOD)

router.post('/ordentomada', ordentomada, broadcastOT)

router.post('/ordenenruta', ordenenRuta, broadcastOR)

router.post('/cancelaordentomadarunner', cancelaOrdenTomadaRunner, broadcastOT)

router.delete('/eliminaordenrunner/:id', eliminaOrdenRunner, broadcastOT)


export default router