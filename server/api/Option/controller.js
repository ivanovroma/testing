import Validation from '../../modules/Validation'

import OptionModel from './model'


export const Create = async (req, res) => {
  // Валидируем полученные данные
  const error = await Validation.Check({
    fields: req.body,
    rules: [
      'question_id_required', 'question_id_invalid', 'question_not_found_by_id',
      'test_id_required', 'test_id_invalid', 'test_not_found_by_id',
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
  const testId = req.body.testId
  const correct = !!req.body.correct

  // Создаем опцию
  try {
    const createdOption = await OptionModel.create({
      label,
      questionId,
      testId,
      correct
    })
  
    return res.json({
      success: true,
      response: createdOption
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'option',
        message: 'create_error'
      }
    })
  }
}

export const GetList = async (req, res) => {
  try {
    const options = await OptionModel.find()

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
    const options = await OptionModel.find({ testId })

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
    const option = await OptionModel.findOne({ _id: optionId })
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
    await OptionModel.deleteOne({ _id: optionId })
    
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