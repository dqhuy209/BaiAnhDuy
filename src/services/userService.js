/* eslint-disable no-unused-vars */
import { get, post } from './service'
function login(payload) {
  return post('/login', payload)
}

function getLoggedUser() {
  return get('/user')
}
export const userService = {
  login,
  getLoggedUser,
}
