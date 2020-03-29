import TestApi from '../api/Test'

export const state = () => ({
  list: [],
  error: ''
})

export const getters = {
  get (state) {
    return state.list
  },
  getByTestId: (state) => (testId) => {
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item._id === testId) {
        return item
      }
    }

    return { label: '404' }
  },
  getError (state) {
    return state.error
  }
}

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

    for (let i = 0; i < state.list.length; i++) {
      let test = state.list[i]

      if (test._id === _id) {
        test.label = label
        break
      }
    }
  },

  async remove (state, payload) {
    const testId = payload.testId

    for (let i = 0; i < state.list.length; i++) {
      let test = state.list[i]
      if (test._id === testId) {
        state.list.splice(i, 1)
      }
    }
  },

  setError (state, payload) {
    state.error = payload
  }
}

export const actions = {
  async create ({ commit }, payload) {
    const result = await TestApi.create(payload)
    if (result.success) {
      commit('create', result.response)
    }

    return result
  },

  async get ({ commit }, payload) {
    const result = await TestApi.get(payload)
    if (result.success) {
      commit('set', result.response)
    }
  },

  async update ({ commit }, payload) {
    const result = await TestApi.update(payload)
    if (result.success) {
      commit('update', result.response)
    }

    return result
  },

  async remove ({ commit }, payload) {
    const result = await TestApi.remove(payload)
    if (result.success) {
      commit('remove', payload)
    }

    return result
  }
}
