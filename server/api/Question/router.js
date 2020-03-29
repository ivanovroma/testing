import express from 'express'

import * as QuestionController from './controller'


// Middlewares init
import SetCurrentUser from '../../middlewares/SetCurrentUser'
import CheckAdmin from '../../middlewares/CheckAdmin'
// Middlewares init


const router = express.Router()

router.get('/index', SetCurrentUser, CheckAdmin, QuestionController.GetList)
router.post('/get-by-test-id', SetCurrentUser, QuestionController.GetListByTestId)
router.post('/create', SetCurrentUser, CheckAdmin, QuestionController.Create)
router.post('/update', SetCurrentUser, CheckAdmin, QuestionController.Update)
router.post('/remove', SetCurrentUser, CheckAdmin, QuestionController.Remove)


export default router