import express from 'express'

import * as AnswerController from './controller'


// Middlewares init
import SetCurrentUser from '../../middlewares/SetCurrentUser'
import CheckAdmin from '../../middlewares/CheckAdmin'
// Middlewares init


const router = express.Router()

router.get('/index', SetCurrentUser, CheckAdmin, AnswerController.GetList)
router.post('/get-by-user-id', SetCurrentUser, AnswerController.GetListByUserId)
router.post('/create', SetCurrentUser, AnswerController.Create)
router.post('/update', SetCurrentUser, CheckAdmin, AnswerController.Update)
router.post('/remove', SetCurrentUser, CheckAdmin, AnswerController.Remove)


export default router