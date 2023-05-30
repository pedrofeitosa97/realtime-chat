import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginData, LoginSchema } from './validator'
import { useAuth } from '../../hooks/useAuth'
import { StyledContainer } from './style'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  })

  const navigate = useNavigate()
  const { signIn } = useAuth()

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit(signIn)}>
        <h2>Login</h2>
        <p className="login_description">
          Faça login e converse em tempo real com pessoas aleatórias.
        </p>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Digite seu email"
            {...register('email')}
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            {...register('password')}
          />
        </label>
        <p className="register_link" onClick={() => navigate('/register')}>
          Não possui uma conta? Registre-se
        </p>
        <button type="submit">Entrar</button>
      </form>
    </StyledContainer>
  )
}

export { Login }
