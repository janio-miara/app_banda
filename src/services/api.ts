// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import {deleteItem, getItem} from "../utils/persistenceUtils";
import {TOKEN_KEY} from "../utils/constants";


const api = axios.create({
  baseURL: 'http://ec2-52-14-112-165.us-east-2.compute.amazonaws.com:4000/',
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
      window.location.href = '/logout'
    }
    return Promise.reject(error)
  }
)

export { defaultsHeadersAxios, api }

export default api
