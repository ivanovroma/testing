import express from 'express'

import * as UserController from './controller'


// Middlewares init
import SetCurrentUser from '../../middlewares/SetCurrentUser'
import CheckAdmin from '../../middlewares/CheckAdmin'
// Middlewares init


const router = express.Router()

router.post('/signin', UserController.SignIn)
router.get('/get-current-user-by-jwt', SetCurrentUser, CheckAdmin, UserController.GetCurrentUserByJwt)
router.post('/create', SetCurrentUser, CheckAdmin, UserController.Create)
router.get('/index', SetCurrentUser, CheckAdmin, UserController.GetList)
router.post('/remove', SetCurrentUser, CheckAdmin, UserController.Remove)
router.post('/block', SetCurrentUser, CheckAdmin, UserController.Block)
router.post('/update', SetCurrentUser, CheckAdmin, UserController.Update)
router.post('/update-password', SetCurrentUser, CheckAdmin, UserController.UpdatePassword)
router.post('/create-superuser', UserController.CreateSuperUser)


export default router