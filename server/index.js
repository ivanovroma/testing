// Libs init 
import mongoose from 'mongoose'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import body_parser from 'body-parser'
// Libs init 


// Routes init
import UserRouter from './api/User/router'
import DepartmentRouter from './api/Department/router'
import TestRouter from './api/Test/router'
import QuestionRouter from './api/Question/router'
import OptionRouter from './api/Option/router'
import ResultRouter from './api/Result/router'
import AnswerRouter from './api/Answer/router'
// Routes init


// MongoDB init
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/testing-platform', { useNewUrlParser: true, autoIndex: false })
  .then( () => console.log('Подключился к MongoDB.') )
  .catch( () => console.log('Запусти MongoDB.') )
// MongoDB init


// Server init
const server = express()

server.listen(3866, err => {
  if (err) throw err

  console.log('Сервер запущен на 3866 порту.')
})

server.use( cors() )
server.use( morgan('tiny') )
server.use( body_parser.json() )
server.use( body_parser.urlencoded({ extended: true }) )

server.use('/api/user', UserRouter)
server.use('/api/department', DepartmentRouter)
server.use('/api/test', TestRouter)
server.use('/api/question', QuestionRouter)
server.use('/api/option', OptionRouter)
server.use('/api/result', ResultRouter)
server.use('/api/answer', AnswerRouter)
// Server init
