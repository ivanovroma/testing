import TestApi from '../api/Test'
import QuestionApi from '../api/Question'
import OptionApi from '../api/Option'
import ResultApi from '../api/Result'
import AnswerApi from '../api/Answer'

export const state = () => ({
  tests: [],
  questions: [],
  options: [],
  results: [],
  answers: [],
  error: ''
})

export const getters = {
  getTestList (state) {
    return state.tests
  },
  getTestStartingByTestId: (state) => (testId) => {
    for (let i = 0; i < state.results.length; i++) {
      let result = state.results[i]
      if (result.testId === testId) {
        return true
      }
    }
    return false
  },

  getTestByTestId: (state) => (testId) => {
    for (let i = 0; i < state.tests.length; i++) {
      const item = state.tests[i]

      if (item._id === testId) {
        return item
      }
    }

    return { label: '404' }
  },
  getUncheckQuestionListByTestId: (state) => (testId) => {
    const questions = []
    for (let i = 0; i < state.questions.length; i++) {
      let question = state.questions[i]

      if (question.testId === testId) {
        questions.push(question)
      }
    }
    for (let i = 0; i < state.answers.length; i++) {
      let answer = state.answers[i]

      for (let ii = 0; ii < questions.length; ii++) {
        let question = questions[ii]

        if (question._id === answer.questionId) {
          questions.splice(ii, 1)
          break
        }
      }
    }
    return questions
  },
  getResultList (state) {
    return state.results
  },

  getResultByTestId: (state) => (testId) => {
    for (let i = 0; i < state.results.length; i++) {
      let result = state.results[i]
      if (result.testId === testId) {
        return result
      }
    }
    return false
  },
  getOptionListByQuestionId: (state) => (questionId) => {
    const options = []
    for (let i = 0; i < state.options.length; i++) {
      const item = state.options[i]

      if (item.questionId === questionId) {
        options.push(item)
      }
    }
    return options
  },

  getError (state) {
    return state.error
  }
}

export const mutations = {
  setTestList (state, payload) {
    state.tests = payload.reverse()
  },
  setQuestionList (state, payload) {
    state.questions = payload
  },
  setOptionList (state, payload) {
    state.options = payload
  },

  setResultList (state, payload) {
    state.results = payload
  },
  setAnswerList (state, payload) {
    state.answers = payload
  },

  createResult (state, payload) {
    state.results.push(payload)
  },

  removeQuestion (state, payload) {
    const questionId = payload

    for (let i = 0; i < state.questions.length; i++) {
      let question = state.questions[i]
      if (question._id === questionId) {
        state.questions.splice(i, 1)
      }
    }
  },
  createAnswer (state, payload) {
    state.answers.push(payload)
  },

  setError (state, payload) {
    state.error = payload
  }
}

export const actions = {
  async getTestList ({ commit }, payload) {
    const result = await TestApi.get(payload)
    if (result.success) {
      commit('setTestList', result.response)
    }
  },
  async getQuestionList ({ commit }) {
    const result = await QuestionApi.get()
    if (result.success) {
      commit('setQuestionList', result.response)
    }
  },
  async getOptionList ({ commit }, payload) {
    const result = await OptionApi.get(payload)
    if (result.success) {
      commit('setOptionList', result.response)
    }
  },

  async getResultListByUserId ({ commit }, payload) {
    const result = await ResultApi.getListByUserId(payload)
    if (result.success) {
      commit('setResultList', result.response)
    }
  },
  async getAnswerListByUserId ({ commit }, payload) {
    const result = await AnswerApi.getListByUserId(payload)
    if (result.success) {
      commit('setAnswerList', result.response)
    }
  },

  async createResultByTestId ({ commit }, payload) {
    const result = await ResultApi.create(payload)
    if (result.success) {
      commit('createResult', result.response)
    }
  },

  async createAnswer ({ commit }, payload) {
    const result = await AnswerApi.create(payload)
    if (result.success) {
      commit('removeQuestion', result.response.questionId)
      commit('createAnswer', result.response)
    }
  },

  async checkResult ({ commit }, payload) {
    await ResultApi.check(payload)
  }
}
