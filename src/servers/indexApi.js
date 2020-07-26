import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8080'

export function menu () {
  return axios.get('../../static/user.json')
}
