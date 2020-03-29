import express from 'express'

import * as ResultController from './controller'


// Middlewares init
import SetCurrentUser from '../../middlewares/SetCurrentUser'
import CheckAdmin from '../../middlewares/CheckAdmin'
// Middlewares init


const router = express.Router()

router.get('/index', SetCurrentUser, CheckAdmin, ResultController.GetList)
router.post('/get-by-user-id', SetCurrentUser, ResultController.GetListByUserId)
router.post('/create', SetCurrentUser, ResultController.Create)
router.post('/check', SetCurrentUser, ResultController.Check)
// router.post('/update', SetCurrentUser, CheckAdmin, ResultController.Update)
router.post('/remove', SetCurrentUser, CheckAdmin, ResultController.Remove)


export default router