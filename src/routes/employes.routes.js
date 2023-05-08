import { Router } from 'express'
import { getEmployees,createEmployees,
updateEmployees,deleteEmployees,getEmployeesId } from '../controllers/employees.controller.js'

const router = Router()

router.get('/employees', getEmployees)

router.get('/sucursal/:id', getEmployeesId)

router.post('/employees', createEmployees)

router.patch('/sucursal/:id', updateEmployees)

router.delete('/sucursal/:id', deleteEmployees)

export default router