import Api from './Api'

export default {
  async create (credentials) {
    const d = await Api().post('/department/create', credentials)
    return d.data
  },
  async get (credentials) {
    const d = await Api().get('/department/index', credentials)
    return d.data
  },
  async update (credentials) {
    const d = await Api().post('/department/update', credentials)
    return d.data
  },
  async remove (credentials) {
    const d = await Api().post('/department/remove', credentials)
    return d.data
  }
}
