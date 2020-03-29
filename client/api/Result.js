import Api from './Api'

export default {
  async create (credentials) {
    const d = await Api().post('/result/create', credentials)
    return d.data
  },
  async check (credentials) {
    const d = await Api().post('/result/check', credentials)
    return d.data
  },
  async get (credentials) {
    const d = await Api().get('/result/index', credentials)
    return d.data
  },
  async getListByUserId (credentials) {
    const d = await Api().post('/result/get-by-user-id', credentials)
    return d.data
  },
  async update (credentials) {
    const d = await Api().post('/result/update', credentials)
    return d.data
  },
  async remove (credentials) {
    const d = await Api().post('/result/remove', credentials)
    return d.data
  }
}
