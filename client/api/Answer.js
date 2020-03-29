import Api from './Api'

export default {
  async create (credentials) {
    const d = await Api().post('/answer/create', credentials)
    return d.data
  },
  async get (credentials) {
    const d = await Api().get('/answer/index', credentials)
    return d.data
  },
  async getListByUserId (credentials) {
    const d = await Api().post('/answer/get-by-user-id', credentials)
    return d.data
  },
  async update (credentials) {
    const d = await Api().post('/answer/update', credentials)
    return d.data
  },
  async remove (credentials) {
    const d = await Api().post('/answer/remove', credentials)
    return d.data
  }
}
