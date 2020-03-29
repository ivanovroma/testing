import ResultApi from '../api/Result'

export const state = () => ({
  list: [],
  error: ''
})

export const mutations = {
  set (state, payload) {
    state.list = payload.reverse()
  },

  // async update (state, payload) {
  //   const _id = payload._id
  //   const label = payload.label

  //   for (let i = 0; i < state.list.length; i++) {
  //     let department = state.list[i]

  //     if (department._id === _id) {
  //       department.label = label
  //       break
  //     }
  //   }
  // },

  async remove (state, payload) {
    const resultId = payload.resultId

    for (let i = 0; i < state.list.length; i++) {
      let result = state.list[i]
      if (result._id === resultId) {
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
  getByResultId: (state) => (resultId) => {
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item._id === resultId) {
        return item
      }
    }
  },
  getError (state) {
    return state.error
  }
}

export const actions = {
  async get ({ commit }, payload) {
    const result = await ResultApi.get(payload)
    if (result.success) {
      commit('set', result.response)
    }
  },

  // async update ({ commit }, payload) {
  //   const result = await ResultApi.update(payload)
  //   if (result.success) {
  //     commit('update', result.response)
  //   }

  //   return result
  // },

  async remove ({ commit }, payload) {
    const result = await ResultApi.remove(payload)
    if (result.success) {
      commit('remove', payload)
    }

    return result
  }
}
