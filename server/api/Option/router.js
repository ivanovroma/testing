import express from 'express'

import * as OptionController from './controller'


// Middlewares init
import SetCurrentUser from '../../middlewares/SetCurrentUser'
import CheckAdmin from '../../middlewares/CheckAdmin'
// Middlewares init


const router = express.Router()

router.get('/index', SetCurrentUser, CheckAdmin, OptionController.GetList)
router.post('/get-by-test-id', SetCurrentUser, OptionController.GetListByTestId)
router.post('/create', SetCurrentUser, CheckAdmin, OptionController.Create)
router.post('/update', SetCurrentUser, CheckAdmin, OptionController.Update)
router.post('/remove', SetCurrentUser, CheckAdmin, OptionController.Remove)


export default router