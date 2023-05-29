import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginData, LoginSchema } from './validator'
import { useAuth } from '../../hooks/useAuth'

const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  })

  const { signIn } = useAuth()

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(signIn)}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register('password')} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export { Login }
