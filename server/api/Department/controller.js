import Validation from '../../modules/Validation'

import DepartmentModel from './model'


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
    response: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  
  // Создаем подразделение
  try {
    const createdDepartment = await DepartmentModel.create({
      label
    })

    return res.json({
      success: true,
      response: createdDepartment
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'create_department',
        message: 'create_error'
      }
    })
  }
}

export const GetList = async (req, res) => {
  try {
    const departments = await DepartmentModel.find()

    return res.json({
      success: true,
      response: departments
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'get_list_department',
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
      'department_id_required', 'department_id_invalid', 'department_not_found_by_id',
      'label_required', 'label_invalid'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const label = req.body.label
  const departmentId = req.body.departmentId
  
  // Обновляем подразделение
  try {
    const department = await DepartmentModel.findOne({ _id: departmentId })
    department.label = label
    await department.save()

    return res.json({
      success: true,
      response: department
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'update_department',
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
      'department_id_required', 'department_id_invalid',
      'department_not_found_by_id', 'department_id_used'
    ]
  })

  if (error) return res.json({
    success: false,
    response: error
  })

  // Инициализируем полученные данные
  const departmentId = req.body.departmentId

  // Удаляем подразделение
  try {
    await DepartmentModel.deleteOne({ _id: departmentId })
    
    return res.json({
      success: true
    })
  } catch (e) {
    return res.json({
      success: false,
      response: {
        object: 'database',
        subject: 'delete_department',
        message: 'delete_error'
      }
    })
  }
}