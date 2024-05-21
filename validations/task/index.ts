import { TASK_PRIORITY, TASK_STATUS } from '@/helpers'
import * as z from 'zod'

export const CreateTaskValidation = z.object({
  document: z
    .string()
    .length(11, { message: 'o documento precisa ser o número de CPF' }),
  priority: z.enum(TASK_PRIORITY).default('normal').optional(),
  status: z.enum(TASK_STATUS).default('planning').optional(),
  subject: z.string(),
  content: z.string().optional(),
  deadline: z.coerce.date().optional(),
})
export type CreateTaskValidationType = z.infer<typeof CreateTaskValidation>

export const UpdateTaskValidation = z.object({
  priority: z.enum(TASK_PRIORITY).default('normal').optional(),
  status: z.enum(TASK_STATUS).default('planning').optional(),
  subject: z.string().optional(),
  content: z.string().optional(),
  deadline: z.coerce.date().optional(),
})
export type UpdateTaskValidationType = z.infer<typeof UpdateTaskValidation>
