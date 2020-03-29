import Validation from '../../modules/Validation'

import AnswerModel from './model'


export const Create = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'question_id_required', 'question_id_invalid', 'question_not_found_by_id',
      'test_id_required', 'test_id_invalid', 'test_not_found_by_id',
      'result_id_required', 'result_id_invalid', 'result_not_found_by_id',
      'category_required',
      'optionAnswerIds_required'//, 'optionAnswerIds_invalid',
      //'optionTrueIds_required', 'optionTrueIds_invalid'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const resultId = req.body.resultId
  const questionId = req.body.questionId
  const testId = req.body.testId
  const optionAnswerIds = req.body.optionAnswerIds
  const optionTrueIds = req.body.optionTrueIds
  const category = req.body.category

  // Создаем ответ
  const createdAnswer = await AnswerModel.create({
    resultId,
    userId: req.user._id,
    questionId,
    testId,
    optionAnswerIds,
    optionTrueIds,
    category
  })

  try {
    return res.json({
      success: true,
      response: createdAnswer
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'answer',
        message: 'create_error'
      }
    })
  }
}

export const GetList = async (req, res) => {
  try {
    const answers = await AnswerModel.find()

    return res.json({
      success: true,
      response: answers
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'answer',
        message: 'get_list_error'
      }
    })
  }
}

export const GetListByUserId = async (req, res) => {
  // Инициализируем полученные данные
  const userId = req.user._id

  try {
    const options = await AnswerModel.find({ userId })

    return res.json({
      success: true,
      response: options
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'option',
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
      'option_id_required', 'option_id_invalid', 'option_not_found_by_id',
      'label_required', 'label_invalid'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  const optionId = req.body.optionId
  const correct = !!req.body.correct
  
  // Обновляем вопрос
  try {
    const option = await AnswerModel.findOne({ _id: optionId })
    option.label = label
    option.correct = correct
    await option.save()

    return res.json({
      success: true,
      response: option
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'option',
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
      'option_id_required', 'option_id_invalid',
      'option_not_found_by_id'//, 'test_id_used'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const optionId = req.body.optionId

  // Удаляем вопрос
  try {
    await AnswerModel.deleteOne({ _id: optionId })
    
    return res.json({
      success: true
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'option',
        message: 'delete_error'
      }
    })
  }
}