import Api from './Api'

export default {
  async create (credentials) {
    const d = await Api().post('/option/create', credentials)
    return d.data
  },
  async get (credentials) {
    const d = await Api().get('/option/index', credentials)
    return d.data
  },
  async getByTestId (credentials) {
    const d = await Api().post('/option/get-by-test-id', credentials)
    return d.data
  },
  async update (credentials) {
    const d = await Api().post('/option/update', credentials)
    return d.data
  },
  async remove (credentials) {
    const d = await Api().post('/option/remove', credentials)
    return d.data
  }
}
