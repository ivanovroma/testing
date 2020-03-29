import DepartmentApi from '../api/Department'

export const state = () => ({
  list: [],
  error: ''
})

export const getters = {
  get (state) {
    return state.list
  },
  getByDepartmentId: (state) => (departmentId) => {
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item._id === departmentId) {
        return item
      }
    }
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
      let department = state.list[i]

      if (department._id === _id) {
        department.label = label
        break
      }
    }
  },

  async remove (state, payload) {
    const departmentId = payload.departmentId

    for (let i = 0; i < state.list.length; i++) {
      let department = state.list[i]
      if (department._id === departmentId) {
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
    const result = await DepartmentApi.create(payload)
    if (result.success) {
      commit('create', result.response)
    }

    return result
  },

  async get ({ commit }, payload) {
    const result = await DepartmentApi.get(payload)
    if (result.success) {
      commit('set', result.response)
    }
  },

  async update ({ commit }, payload) {
    const result = await DepartmentApi.update(payload)
    if (result.success) {
      commit('update', result.response)
    }

    return result
  },

  async remove ({ commit }, payload) {
    const result = await DepartmentApi.remove(payload)
    if (result.success) {
      commit('remove', payload)
    }

    return result
  }
}
