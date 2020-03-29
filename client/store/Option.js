import OptionApi from '../api/Option'

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
    const correct = payload.correct

    for (let i = 0; i < state.list.length; i++) {
      let test = state.list[i]

      if (test._id === _id) {
        test.label = label
        test.correct = correct
        break
      }
    }
  },

  async remove (state, payload) {
    const optionId = payload.optionId

    for (let i = 0; i < state.list.length; i++) {
      let option = state.list[i]
      if (option._id === optionId) {
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

  getByQuestionId: (state) => (questionId) => {
    const result = []
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item.questionId === questionId) {
        result.push(item)
      }
    }

    return result
  },

  getByOptionId: (state) => (questionId) => {
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
    const result = await OptionApi.create(payload)
    if (result.success) {
      commit('create', result.response)
    }

    return result
  },

  async get ({ commit }, payload) {
    const result = await OptionApi.get(payload)
    if (result.success) {
      commit('set', result.response)
    }
  },

  async getByTestId ({ commit }, payload) {
    const result = await OptionApi.getByTestId(payload)
    if (result.success) {
      commit('set', result.response)
    }
  },

  async update ({ commit }, payload) {
    const result = await OptionApi.update(payload)
    if (result.success) {
      commit('update', result.response)
    }

    return result
  },

  async remove ({ commit }, payload) {
    const result = await OptionApi.remove(payload)
    if (result.success) {
      commit('remove', payload)
    }

    return result
  }
}
