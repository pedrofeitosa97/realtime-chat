import z from 'zod'

export const registerSchema = z.object({
  name: z.string().nonempty('Nome de usuário é obrigatório'),
  email: z.string().email('Deve ser um email'),
  password: z.string().nonempty('A senha é obrigatória'),
  photo: z.string().nonempty('Uma imagem é obrigatória'),
})

export type registerData = z.infer<typeof registerSchema>
