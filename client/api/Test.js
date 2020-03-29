import Api from './Api'

export default {
  async get (credentials) {
    const d = await Api().get('/test/index', credentials)
    return d.data
  },

  async create (credentials) {
    const d = await Api().post('/test/create', credentials)
    return d.data
  },
  async update (credentials) {
    const d = await Api().post('/test/update', credentials)
    return d.data
  },
  async remove (credentials) {
    const d = await Api().post('/test/remove', credentials)
    return d.data
  }
}
