import { ReactNode, createContext } from 'react'
import { LoginData } from '../pages/Login/validator'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { registerData } from '../pages/Register/validator'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextValues = {
  signIn: (data: LoginData) => void
  registerIn: (data: registerData) => void
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const signIn = async (data: LoginData) => {
    try {
      const response = await api.post('/login', data)
      const { token } = response.data

      api.defaults.headers.common.authorization = `Bearer ${token}`
      localStorage.setItem('realtimechat:token', token)
      navigate('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  const registerIn = async (data: registerData) => {
    try {
      await api.post('/users', data)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, registerIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
