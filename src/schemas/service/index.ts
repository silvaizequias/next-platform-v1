import * as yup from 'yup'

export const ServiceCreateSchema = yup
  .object()
  .shape({
    isActive: yup.boolean().required(),
    serviceCode: yup.string().required(),
    name: yup.string().required(),
    solution: yup.mixed().oneOf(['NONE']).required(),
    description: yup.string().required(),
    price: yup.number().positive().required(),
  })
  .required()

export type ServiceCreateSchemaType = yup.InferType<typeof ServiceCreateSchema>

export const ServiceUpdateSchema = yup.object().shape({
  isActive: yup.boolean().default(false),
  serviceCode: yup.string().default(''),
  name: yup.string().default(''),
  solution: yup.string().default(''),
  description: yup.string().default(''),
  price: yup.number().positive().default(0),
})

export type ServiceUpdateSchemaType = yup.InferType<typeof ServiceUpdateSchema>
