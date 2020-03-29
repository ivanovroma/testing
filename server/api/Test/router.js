import express from 'express'

import * as TestController from './controller'


// Middlewares init
import SetCurrentUser from '../../middlewares/SetCurrentUser'
import CheckAdmin from '../../middlewares/CheckAdmin'
// Middlewares init


const router = express.Router()

router.get('/index', SetCurrentUser, CheckAdmin, TestController.GetList)
router.post('/create', SetCurrentUser, CheckAdmin, TestController.Create)
router.post('/update', SetCurrentUser, CheckAdmin, TestController.Update)
router.post('/remove', SetCurrentUser, CheckAdmin, TestController.Remove)


export default router