import * as z from 'zod'

const DOC_TYPE = ['CPF', 'CNPJ', 'RG', 'CNH', 'CTPS', 'PASSPORT'] as const
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const ProfileUpdateSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  docType: z.enum(DOC_TYPE).default('CPF').optional(),
  docCode: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  zone: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
})

export type ProfileUpdateSchemaType = z.infer<typeof ProfileUpdateSchema>

export const ProfilePasswordUpdateSchema = z.object({
  oldPassword: z.string().min(8).max(25),
  password: z.string().min(8).max(25),
})

export type ProfilePasswordUpdateSchemaType = z.infer<
  typeof ProfilePasswordUpdateSchema
>

export const ProfileImageUploadSchema = z
  .object({
    avatar: z
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

export type ProfileImageUploadSchemaType = z.infer<
  typeof ProfileImageUploadSchema
>
