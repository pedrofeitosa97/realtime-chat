import { registerData } from './validator'
import { registerSchema } from './validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
  const { register, handleSubmit } = useForm<registerData>({
    resolver: zodResolver(registerSchema),
  })

  const { registerIn } = useAuth()

  return (
    <div>
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit(registerIn)}>
        <label htmlFor="name">Nome</label>
        <input type="text" id="name" {...register('name')} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />

        <label htmlFor="password">Senha</label>
        <input type="password" id="password" {...register('password')} />

        <label htmlFor="photoURL">URL da Imagem</label>
        <input type="text" id="photoURL" {...register('photoURL')} />

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export { Register }
