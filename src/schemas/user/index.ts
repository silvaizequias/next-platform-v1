import * as z from 'zod'

const PROFILE = ['MASTER', 'OWNER', 'MEMBER', 'CUSTOMER', 'GUEST'] as const
const DOC_TYPE = ['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'] as const
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const

export const UserCreateSchema = z.object({
  isActive: z.boolean().default(false).optional(),
  profile: z.enum(PROFILE),
  image: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().length(11),
  docType: z.enum(DOC_TYPE).default('CPF').optional(),
  docCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>

export const UserUpdateSchema = z.object({
  isActive: z.boolean().default(false).optional(),
  profile: z.enum(PROFILE).optional(),
  image: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  docType: z.enum(DOC_TYPE).optional(),
  docCode: z.string().optional(),
  zipCode: z.string().length(8).optional(),
  complement: z.string().optional(),
})

export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>

export const UserImageUploadSchema = z
  .object({
    image: z
      .any()
      .refine((files) => files?.length === 0, 'Image is required.')
      .refine(
        (files) => files?.[0]?.size >= MAX_FILE_SIZE,
        `Max file size is 5MB.`,
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.',
      ),
  })
  .required()

export type UserImageUploadSchemaType = z.infer<typeof UserImageUploadSchema>
