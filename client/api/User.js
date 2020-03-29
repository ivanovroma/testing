import Api from './Api'

export default {
  async create (credentials) {
    const d = await Api().post('/user/create', credentials)
    return d.data
  },
  async get (credentials) {
    const d = await Api().get('/user/index', credentials)
    return d.data
  },
  async update (credentials) {
    const d = await Api().post('/user/update', credentials)
    return d.data
  },
  async updatePassword (credentials) {
    const d = await Api().post('/user/update-password', credentials)
    return d.data
  },
  async remove (credentials) {
    const d = await Api().post('/user/remove', credentials)
    return d.data
  },
  async signin (credentials) {
    const d = await Api().post('/user/signin', credentials)
    return d.data
  },
  async getCurrentUserByJwt (credentials) {
    const d = await Api().get('/user/get-current-user-by-jwt', credentials)
    return d.data
  }
}
