import { Router } from 'express'
import { getAdmin,createAdmin,
updateAdmin,deleteAdmin,getAdminId } from '../controllers/admin.controller.js'

const router = Router()

router.get('/admin', getAdmin)

router.get('/admin/:id', getAdminId)

router.post('/admin', createAdmin)

router.patch('/admin/:id', updateAdmin)

router.delete('/admin/:id', deleteAdmin)

export default router