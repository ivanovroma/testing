import Validation from '../../modules/Validation'

import TestModel from './model'
import QuestionModel from '../Question/model'
import OptionModel from '../Option/model'
import ResultModel from '../Result/model'
import AnswerModel from '../Answer/model'


export const Create = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'label_required', 'label_invalid'
    ]
  })

  if (error) return res.json({
    success: false,
    error: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  
  // Создаем тест
  try {
    const createdTest = await TestModel.create({
      label
    })

    return res.json({
      success: true,
      response: createdTest
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'create_test',
        message: 'create_error'
      }
    })
  }
}

export const GetList = async (req, res) => {
  try {
    const tests = await TestModel.find()

    return res.json({
      success: true,
      response: tests
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'get_list_test',
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
      'test_id_required', 'test_id_invalid', 'test_not_found_by_id',
      'label_required', 'label_invalid'
    ]
  })

  if (error) return res.json({
    success: false,
    error: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  const testId = req.body.testId
  
  // Обновляем тест
  try {
    const test = await TestModel.findOne({ _id: testId })
    test.label = label
    await test.save()

    return res.json({
      success: true,
      response: test
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'update_test',
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
      'test_id_required', 'test_id_invalid',
      'test_not_found_by_id'//, 'test_id_used'
    ]
  })

  if (error) return res.json({
    success: false,
    message: error
  })

  // Инициализируем полученные данные
  const testId = req.body.testId

  // Удаляем тест
  try {
    await TestModel.deleteOne({ _id: testId })
    await QuestionModel.deleteMany({ testId })
    await OptionModel.deleteMany({ testId })
    await ResultModel.deleteMany({ testId })
    await AnswerModel.deleteMany({ testId })
    
    return res.json({
      success: true
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'delete_test',
        message: 'delete_error'
      }
    })
  }
}