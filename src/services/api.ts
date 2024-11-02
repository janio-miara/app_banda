// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import {deleteItem, getItem} from "../utils/persistenceUtils";
import {TOKEN_KEY} from "../utils/constants";


const api = axios.create({
  baseURL: 'https://agendabanda.com/',
})

const defaultsHeadersAxios = (token: string) => {
  api.defaults.headers.common.Authorization = token && `Token ${token}`
}

api.interceptors.response.use(
  response => response,
  async error => {
    const userToken = getItem(TOKEN_KEY)
    if (error.response.status === 401 && !!userToken) {
      deleteItem(TOKEN_KEY)
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export { defaultsHeadersAxios, api }

export default api
