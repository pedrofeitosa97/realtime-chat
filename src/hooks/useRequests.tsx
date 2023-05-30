import jwt_decode from 'jwt-decode'
import api from '../services/api'

type decodedToken = {
  exp: number
  iat: number
  sub: string
  userName: string
  photoURL: string
}
export const useRequests = () => {
  const getCurrentUserRequest = () => {
    try {
      const userToken: string | null =
        localStorage.getItem('realtimechat:token')
      if (userToken) {
        const decodedToken: decodedToken = jwt_decode(userToken)
        const userName = decodedToken.userName
        return userName
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getCurrentUserIdRequest = () => {
    try {
      const userToken: string | null =
        localStorage.getItem('realtimechat:token')
      if (userToken) {
        const decodedToken: decodedToken = jwt_decode(userToken)
        const userId = decodedToken.sub
        console.log(userId)
        return userId
      }
    } catch (error) {
      console.error(error)
    }
  }
  const getMessagesList = async () => {
    try {
      const response = await api.get('/messages')
      const messages = response.data
      const messageArray = Object.values(messages)
      return messageArray
    } catch (error) {
      console.error(error)
    }
  }
  const createMessage = async (data: any) => {
    try {
      await api.post('/messages', data)
    } catch (error) {
      console.error(error)
    }
  }
  return {
    getCurrentUserRequest,
    getMessagesList,
    createMessage,
    getCurrentUserIdRequest,
  }
}
