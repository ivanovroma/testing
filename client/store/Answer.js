import AnswerApi from '../api/Answer'

export const state = () => ({
  list: [],
  error: ''
})

export const getters = {
  get (state) {
    return state.list
  },
  getByResultId: (state) => (resultId) => {
    const answers = []
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item.resultId === resultId) {
        answers.push(item)
      }
    }
    return answers
  },
  getError (state) {
    return state.error
  }
}

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

  // async remove (state, payload) {
  //   const departmentId = payload.departmentId

  //   for (let i = 0; i < state.list.length; i++) {
  //     let department = state.list[i]
  //     if (department._id === departmentId) {
  //       state.list.splice(i, 1)
  //     }
  //   }
  // },

  setError (state, payload) {
    state.error = payload
  }
}

export const actions = {
  async get ({ commit }, payload) {
    const result = await AnswerApi.get(payload)
    if (result.success) {
      commit('set', result.response)
    }
  }

  // async update ({ commit }, payload) {
  //   const result = await AnswerApi.update(payload)
  //   if (result.success) {
  //     commit('update', result.response)
  //   }

  //   return result
  // },

  // async remove ({ commit }, payload) {
  //   const result = await AnswerApi.remove(payload)
  //   if (result.success) {
  //     commit('remove', payload)
  //   }

  //   return result
  // }
}
