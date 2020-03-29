import Validation from '../../modules/Validation'

import ResultModel from './model'
import AnswerModel from '../Answer/model'


export const Create = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'test_id_required', 'test_id_invalid', 'test_not_found_by_id'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const testId = req.body.testId
  const userId = req.user._id

  // Проверяю есть ли результат в базе
  const result = await ResultModel.findOne({ testId, userId })
  if (!!result) {
    return res.json({
      success: true,
      response: result
    })
  }

  // Создаем тест
  try {
    const createdResult = await ResultModel.create({
      userId,
      testId,
      points: 0
    })
  
    return res.json({
      success: true,
      response: createdResult
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'result',
        message: 'create_error'
      }
    })
  }
}

export const Check = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'result_id_required', 'result_id_invalid', 'result_not_found_by_id'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const resultId = req.body.resultId

  const result = await ResultModel.findById(resultId)
  const answers = await AnswerModel.find({ resultId })

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i]

    if (answer.optionAnswerIds[0] == answer.optionTrueIds[0])
      result.points += 1
  }

  result.complete = true

  result.save()

  return res.json({
    success: true,
    response: result
  })
  try {
    
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'result',
        message: 'check_error'
      }
    })
  }
}

export const GetList = async (req, res) => {
  try {
    const results = await ResultModel.find()

    return res.json({
      success: true,
      response: results
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'result',
        message: 'get_list_error'
      }
    })
  }
}

export const GetListByUserId = async (req, res) => {
  // Инициализируем полученные данные
  const userId = req.user._id

  try {
    const results = await ResultModel.find({ userId })

    return res.json({
      success: true,
      response: results
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'result',
        message: 'get_list_error'
      }
    })
  }
}

export const Update = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'question_id_required', 'question_id_invalid', 'question_not_found_by_id',
      'label_required', 'label_invalid'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  const questionId = req.body.questionId
  
  // Обновляем вопрос
  try {
    const question = await QuestionModel.findOne({ _id: questionId })
    question.label = label
    await question.save()

    return res.json({
      success: true,
      response: question
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'question',
        message: 'update_error'
      }
    })
  }
}

export const Remove = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'result_id_required', 'result_id_invalid',
      'result_not_found_by_id'//, 'test_id_used'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const resultId = req.body.resultId

  // Удаляем вопрос
  try {
    await ResultModel.deleteOne({ _id: resultId })
    await AnswerModel.deleteMany({ resultId })
    
    return res.json({
      success: true
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'result',
        message: 'delete_error'
      }
    })
  }
}