import UserModel from '../api/User/model'
import DepartmentModel from '../api/Department/model'
import TestModel from '../api/Test/model'
import QuestionModel from '../api/Question/model'
import OptionModel from '../api/Option/model'
import ResultModel from '../api/Result/model'

export default {
  async Check(data) {
    const fields = data.fields
    const user = data.user
    const rules = data.rules

    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i]
      let subject = this.Rules[rule].subject
      let Rule = this.Rules[rule]

      if (Rule.required) {
        if (!fields[subject] || fields[subject].length === 0)
          return {
            object: 'validation',
            subject,
            message: rule
          }
      } else if (Rule.objectId) {
        if (fields[subject].length !== 24)
          return {
            object: 'validation',
            subject,
            message: rule
          }
      } else {
        let result = await Rule.check(fields, user)
        if (result) {
          return {
            object: 'validation',
            subject,
            message: rule
          }
        }
      }
    }

    return false
  },

  Rules: {
    label_required: {
      subject: 'label',
      required: true
    }, 
    
    label_invalid: {
      subject: 'label',
      check: async (fields) => {
        const regValidLabel = /[^A-Za-zА-Яа-я,?!()0-9\s<>%.+-/#№:-]/
        const testedLabel = regValidLabel.test(fields.label)
        if (testedLabel)
          return true

        return false
      }
    },

    category_required: {
      subject: 'category',
      required: true
    },

    name_required: {
      subject: 'name',
      required: true
    }, 
    
    name_invalid: {
      subject: 'name',
      check: async (fields) => {
        const regValidName = /[^А-Яа-я\s]/
        const testedName = regValidName.test(fields.name)
        if (testedName)
          return true

        return false
      }
    },

    login_required: {
      subject: 'login',
      required: true
    },

    login_invalid: {
      subject: 'login',
      check: async (fields) => {
        const regValidLogin = /[^A-Za-z0-9]/
        const testedLogin = regValidLogin.test(fields.login)
        if (testedLogin)
          return true

        return false
      }
    },

    login_already_exist: {
      subject: 'login',
      check: async (fields) => {
        const existUser = await UserModel.findOne({ login: fields.login })
        if (existUser) return true
      }
    },

    password_required: {
      subject: 'password',
      required: true
    },

    password_invalid: {
      subject: 'password',
      check: async (fields) => {
        const regValidPassword = /^[a-zA-Z0-9]\w{3,14}$/
        const testedPassword = regValidPassword.test(fields.password)
        if (!testedPassword)
          return true

        return false
      }
    },

    role_required: {
      subject: 'role',
      required: true
    },

    role_invalid: {
      subject: 'role',
      check: async (fields) => {
        if (fields.role !== 'admin' && fields.role !== 'examinee')
          return true
        
        return false
      }
    },

    type_required: {
      subject: 'type',
      required: true
    },

    type_invalid: {
      subject: 'type',
      check: async (fields) => {
        if (fields.type !== 'check' && fields.type !== 'radio')
          return true
        
        return false
      }
    },

    user_id_required: {
      subject: 'userId',
      required: true
    },

    user_id_invalid: {
      subject: 'userId',
      objectId: true
    },

    user_not_found_by_id: {
      subject: 'userId',
      check: async (fields) => {
        const user = await UserModel.findOne({ _id: fields.userId })
        if (!user)
          return true
      }
    },

    department_id_required: {
      subject: 'departmentId',
      required: true
    },

    department_id_invalid: {
      subject: 'departmentId',
      objectId: true
    },

    department_not_found_by_id: {
      subject: 'departmentId',
      check: async (fields) => {
        const department = await DepartmentModel.findOne({ _id: fields.departmentId })
        if (!department)
          return true
      }
    },

    department_id_used: {
      subject: 'departmentId',
      check: async (fields) => {
        const users = await UserModel.find({ departmentId: fields.departmentId })
        if (users.length > 0)
          return true
      }
    },

    test_id_required: {
      subject: 'testId',
      required: true
    },

    test_id_invalid: {
      subject: 'testId',
      objectId: true
    },

    test_not_found_by_id: {
      subject: 'testId',
      check: async (fields) => {
        const test = await TestModel.findOne({ _id: fields.testId })
        if (!test)
          return true
      }
    },

    question_id_required: {
      subject: 'questionId',
      required: true
    },

    question_id_invalid: {
      subject: 'questionId',
      objectId: true
    },

    question_not_found_by_id: {
      subject: 'questionId',
      check: async (fields) => {
        const question = await QuestionModel.findOne({ _id: fields.questionId })
        if (!question)
          return true
      }
    },

    option_id_required: {
      subject: 'optionId',
      required: true
    },

    option_id_invalid: {
      subject: 'optionId',
      objectId: true
    },

    option_not_found_by_id: {
      subject: 'optionId',
      check: async (fields) => {
        const option = await OptionModel.findOne({ _id: fields.optionId })
        if (!option)
          return true
      }
    },

    result_id_required: {
      subject: 'resultId',
      required: true
    },

    result_id_invalid: {
      subject: 'resultId',
      objectId: true
    },

    result_not_found_by_id: {
      subject: 'resultId',
      check: async (fields) => {
        const result = await ResultModel.findOne({ _id: fields.resultId })
        if (!result)
          return true
      }
    },

    optionAnswerIds_required: {
      subject: 'optionAnswerIds',
      required: true
    },

    optionAnswerIds_invalid: {
      subject: 'optionAnswerIds',
      check: async (fields) => {
        if (fields.optionAnswerIds.isArray()) return false
        return true
      }
    },

    optionTrueIds_required: {
      subject: 'optionTrueIds',
      required: true
    },

    optionTrueIds_invalid: {
      subject: 'optionTrueIds',
      check: async (fields) => {
        if (fields.optionTrueIds.isArray()) return false
        return true
      }
    },
  }
}