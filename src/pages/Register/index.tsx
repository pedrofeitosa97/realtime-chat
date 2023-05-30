import { registerData } from './validator'
import { registerSchema } from './validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { StyledContainerRegister } from './style'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register, handleSubmit } = useForm<registerData>({
    resolver: zodResolver(registerSchema),
  })

  const navigate = useNavigate()
  const { registerIn } = useAuth()

  return (
    <StyledContainerRegister>
      <form onSubmit={handleSubmit(registerIn)}>
        <h2>Registro de usuário</h2>
        <p>Crie agora sua conta e desfrute da nossa plataforma!</p>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            placeholder="Digite seu usuário"
            {...register('name')}
          />
        </label>

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

        <label htmlFor="photoURL">
          <input
            type="text"
            id="photoURL"
            placeholder="Insira uma URL de imagem válida"
            {...register('photoURL')}
          />
        </label>

        <button type="submit">Entrar</button>
        <p className="back_button" onClick={() => navigate('/')}>
          Voltar para o início
        </p>
      </form>
    </StyledContainerRegister>
  )
}

export { Register }
