// import lodash from 'lodash'
import UserApi from '../api/User'

export const state = () => ({
  list: [],
  error: '',
  user: null
})

export const getters = {
  get (state) {
    return state.list
  },

  getCurrentUser (state) {
    return state.user
  },

  getByUserId: (state) => (userId) => {
    for (let i = 0; i < state.list.length; i++) {
      const item = state.list[i]

      if (item._id === userId) {
        return item
      }
    }
  },

  getError (state) {
    return state.error
  }
}

export const mutations = {
  async set (state, payload) {
    state.list = payload.reverse()
  },

  create (state, payload) {
    state.list.unshift(payload)
  },

  async update (state, payload) {
    for (let i = 0; i < state.list.length; i++) {
      let user = state.list[i]

      if (payload._id === user._id) {
        user.name = payload.name
        user.blocked = payload.blocked
        user.departmentId = payload.departmentId
      }
    }
  },

  async remove (state, payload) {
    const userId = payload.userId

    for (let i = 0; i < state.list.length; i++) {
      let user = state.list[i]
      if (user._id === userId) {
        state.list.splice(i, 1)
      }
    }
  },

  setCurrentUser (state, payload) {
    state.user = payload
  },

  setError (state, payload) {
    state.error = payload
  }
}

export const actions = {
  async create ({ commit }, payload) {
    const result = await UserApi.create(payload)
    if (result.success) {
      commit('create', result.response)
    }

    return result
  },

  async get ({ commit }, payload) {
    const result = await UserApi.get(payload)

    if (result.success) {
      commit('set', result.response)
    }
  },

  async update ({ commit }, payload) {
    const result = await UserApi.update(payload)
    if (result.success) {
      commit('update', result.response)
    }

    return result
  },

  async updatePassword ({ commit }, payload) {
    const result = await UserApi.updatePassword(payload)

    return result
  },

  async remove ({ commit }, payload) {
    const result = await UserApi.remove(payload)
    if (result.success) {
      commit('remove', payload)
    }

    return result
  },

  async signinByJwtFromLocaleStorage ({ commit }) {
    let jwt = localStorage.getItem('TestingPlatform')
    if (!jwt) return

    const recievedUser = await UserApi.getCurrentUserByJwt({})
    if (!recievedUser.success) return

    commit('setCurrentUser', recievedUser.response)

    this.$router.push('/')
  },

  async signinFromData ({ commit }, payload) {
    const signinUser = await UserApi.signin(payload)

    if (!signinUser.success) {
      let error = signinUser.response.message
      commit('setError', error)
      return
    }

    await localStorage.setItem('TestingPlatform', signinUser.response.token)
    commit('setCurrentUser', signinUser.response.user)
    commit('setError', '')

    this.$router.push('/')
  },

  async logout ({ commit }) {
    await localStorage.removeItem('TestingPlatform')
    await commit('setCurrentUser', null)
    this.$router.push('/signin')
  },

  async setError ({ commit }, payload) {
    commit('setError', payload)
  }
}
