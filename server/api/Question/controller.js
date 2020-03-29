import Validation from '../../modules/Validation'

import QuestionModel from './model'
import OptionModel from '../Option/model'
import AnswerModel from '../Answer/model'


export const Create = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'test_id_required', 'test_id_invalid', 'test_not_found_by_id',
      'label_required', 'label_invalid',
      'category_required',
      'type_required', 'type_invalid'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  const testId = req.body.testId
  const type = req.body.type
  const img = req.body.img
  const category = req.body.category

  // Создаем вопрос
    const createdQuestion = await QuestionModel.create({
      label,
      testId,
      type,
      img,
      category
    })
  try {
  
    return res.json({
      success: true,
      response: createdQuestion
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'question',
        message: 'create_error'
      }
    })
  }
}

export const GetList = async (req, res) => {
  try {
    const questions = await QuestionModel.find()

    return res.json({
      success: true,
      response: questions
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'question',
        message: 'get_list_error'
      }
    })
  }
}

export const GetListByTestId = async (req, res) => {
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

  try {
    const questions = await QuestionModel.find({ testId })

    return res.json({
      success: true,
      response: questions
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'question',
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
      'label_required', 'label_invalid',
      'category_required',    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  const questionId = req.body.questionId
  const img = req.body.img
  const category = req.body.category
  
  // Обновляем вопрос
  try {
    const question = await QuestionModel.findOne({ _id: questionId })
    question.label = label
    question.img = img
    question.category = category
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
      'question_id_required', 'question_id_invalid',
      'question_not_found_by_id'//, 'test_id_used'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const questionId = req.body.questionId

  // Удаляем вопрос
  try {
    await QuestionModel.deleteOne({ _id: questionId })
    await OptionModel.deleteMany({ questionId: questionId })
    await AnswerModel.deleteMany({ questionId: questionId })
    return res.json({
      success: true
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'question',
        message: 'delete_error'
      }
    })
  }
}