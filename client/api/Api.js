import axios from 'axios'
import env from '../env'

export default () => {
  var options = {
    baseURL: env.baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (localStorage.getItem('TestingPlatform')) {
    options.headers = {
      'authorization': localStorage.getItem('TestingPlatform'),
      'Content-Type': 'application/json'
    }
  }

  return axios.create(options)
}
