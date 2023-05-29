import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Deve ser um email'),
  password: z.string().nonempty('A senha é obrigatória'),
})

export type LoginData = z.infer<typeof LoginSchema>
