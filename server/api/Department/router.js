import express from 'express'

import * as DepartmentController from './controller'


// Middlewares init
import SetCurrentUser from '../../middlewares/SetCurrentUser'
import CheckAdmin from '../../middlewares/CheckAdmin'
// Middlewares init


const router = express.Router()

router.get('/index', SetCurrentUser, CheckAdmin, DepartmentController.GetList)
router.post('/create', SetCurrentUser, CheckAdmin, DepartmentController.Create)
router.post('/update', SetCurrentUser, CheckAdmin, DepartmentController.Update)
router.post('/remove', SetCurrentUser, CheckAdmin, DepartmentController.Remove)


export default router