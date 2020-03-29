import QuestionApi from '../api/Question'

export const state = () => ({
  list: [],
  error: ''
})

export const mutations = {
  set (state, payload) {
    state.list = payload.reverse()
  },

  create (state, payload) {
    state.list.unshift(payload)
  },

  async update (state, payload) {
    const _id = payload._id
    const label = payload.label
    const type = payload.type
    const category = payload.category

    for (let i = 0; i < state.list.length; i++) {
      let question = state.list[i]

      if (question._id === _id) {
        question.label = label
        question.type = type
        question.category = category
        break
      }
    }
  },

  async remove (state, payload) {
    const questionId = payload.questionId

    for (let i = 0; i < state.list.length; i++) {
      let question = state.list[i]
      if (question._id === questionId) {
        state.list.splice(i, 1)
      }
    }
  },

  setError (state, payload) {
    state.error = payload
  }
}

export const getters = {
  get (state) {
    return state.list
  },
  getByTestId: (state) => (testId) => {
    const result = []
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item.testId === testId) {
        result.push(item)
      }
    }

    return result
  },
  getByQuestionId: (state) => (questionId) => {
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item._id === questionId) {
        return item
      }
    }
  },
  getError (state) {
    return state.error
  }
}

export const actions = {
  async create ({ commit }, payload) {
    const result = await QuestionApi.create(payload)
    if (result.success) {
      commit('create', result.response)
    }

    return result
  },

  async get ({ commit }, payload) {
    const result = await QuestionApi.get(payload)
    if (result.success) {
      commit('set', result.response)
    }
  },

  async getByTestId ({ commit }, payload) {
    const result = await QuestionApi.getByTestId(payload)
    if (result.success) {
      commit('set', result.response)
    }
  },

  async update ({ commit }, payload) {
    const result = await QuestionApi.update(payload)
    if (result.success) {
      commit('update', result.response)
    }

    return result
  },

  async remove ({ commit }, payload) {
    const result = await QuestionApi.remove(payload)
    if (result.success) {
      commit('remove', payload)
    }

    return result
  }
}
