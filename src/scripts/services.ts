import axios from 'axios'
import { browserCookies } from './browser-storage'
import { BROWSER_COOKIE_KEYS } from './const'
import type { FormsUserLogin, FormsUserRegister } from './forms'

interface ResponseType {
  user: {
    id: string
    name: string
    email: string
    create_at: string
  }
  token: string
}

export const fetchUserAPI = {
  axiosFetch: axios.create({
    baseURL: `${process.env.BACK_END_URL}/api/user`,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  setTokenJwtInCookies: function (token: string) {
    browserCookies.add({
      key: BROWSER_COOKIE_KEYS.TOKEN,
      value: JSON.stringify(token),
    })
  },
  registerUser: async function ({
    email,
    name,
    password,
    auto_connection,
  }: FormsUserRegister) {
    console.log(process.env.BACK_END_URL)
    try {
      const response = await this.axiosFetch.post('/register', {
        name,
        email,
        password,
        auto_connection,
      })
      const { token, user }: ResponseType = await response.data
      if (!token || !user) {
        throw new Error('error to register new user')
      }
      this.setTokenJwtInCookies(token)
      window.location.pathname = '/'
    } catch (error) {
      console.log(error)
    }
  },
  loginUser: async function ({
    email,
    password,
    auto_connection,
  }: FormsUserLogin) {
    try {
      const response = await this.axiosFetch.post('/login', {
        email,
        password,
        auto_connection,
      })
      const { token, user }: ResponseType = await response.data
      if (!token || !user) {
        throw new Error('error to login user')
      }
      this.setTokenJwtInCookies(token)
      window.location.pathname = '/'
    } catch (error) {
      console.log(error)
    }
  },
  profilerUser: async function () {
    try {
      const token = browserCookies.get(BROWSER_COOKIE_KEYS.TOKEN)
      if (!token) {
        throw new Error('user not permission')
      }
      const response = await this.axiosFetch.get('', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const result: ResponseType = await response.data
      if (!result) {
        throw new Error('error to login user')
      }
      return {
        user: result.user,
      }
    } catch (error) {
      console.log(error)
    }
  },
}
