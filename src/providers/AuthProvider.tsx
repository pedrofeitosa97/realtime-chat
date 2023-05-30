import { ReactNode, createContext, useState } from 'react'
import { LoginData } from '../pages/Login/validator'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { registerData } from '../pages/Register/validator'
import { io } from 'socket.io-client'
import { useRequests } from '../hooks/useRequests'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextValues = {
  signIn: (data: LoginData) => void
  registerIn: (data: registerData) => void
  socketState: any
  setSocketState: React.Dispatch<React.SetStateAction<null>>
  socketConnect: any
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const { getCurrentUserRequest } = useRequests()
  const [socketState, setSocketState] = useState(null)

  const socketConnect = async () => {
    const socket: any = io('http://localhost:3000')
    await socket.connect()
    socket.emit('set_username', getCurrentUserRequest())
    const userToken: any = localStorage.getItem('realtimechat:token')
    const decodedToken: any = jwt_decode(userToken)
    socket.emit('set_picture', decodedToken.photo)
    setSocketState(socket)
  }

  const signIn = async (data: LoginData) => {
    try {
      const response = await api.post('/login', data)
      const { token } = response.data

      api.defaults.headers.common.authorization = `Bearer ${token}`
      localStorage.setItem('realtimechat:token', token)
      toast.success('Login realizado com sucesso!', {
        position: 'top-center',
        theme: 'dark',
      })
      socketConnect()
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('Credenciais inválidas', {
        position: 'top-center',
        theme: 'dark',
      })
    }
  }

  const registerIn = async (data: registerData) => {
    try {
      await api.post('/users', data)
      navigate('/')
      toast.success('Usuário registrado com sucesso', {
        position: 'top-center',
        theme: 'dark',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, registerIn, socketState, setSocketState, socketConnect }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
