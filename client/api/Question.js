import Api from './Api'

export default {
  async create (credentials) {
    const d = await Api().post('/question/create', credentials)
    return d.data
  },
  async get (credentials) {
    const d = await Api().get('/question/index', credentials)
    return d.data
  },
  async getByTestId (credentials) {
    const d = await Api().post('/question/get-by-test-id', credentials)
    return d.data
  },
  async update (credentials) {
    const d = await Api().post('/question/update', credentials)
    return d.data
  },
  async remove (credentials) {
    const d = await Api().post('/question/remove', credentials)
    return d.data
  }
}
