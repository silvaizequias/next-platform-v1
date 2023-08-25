import * as yup from 'yup'

export const ContractCreateSchema = yup.object().shape({
  userPhone: yup.string().length(11).required(),
  serviceCode: yup.string().required(),
  contractCode: yup.string().required(),
  status: yup
    .mixed()
    .oneOf(['ACTIVE', 'SUSPENDED', 'FINISHED', 'CANCELED'])
    .required(),
  description: yup.string().optional(),
  note: yup.string().optional(),
  startedIn: yup.date().optional(),
  period: yup
    .mixed()
    .oneOf(['MONTHLY', 'QUARTERLY', 'SEMESTERLY', 'YEARLY'])
    .required(),
  endedIn: yup.date().optional(),
  payment: yup.mixed().oneOf(['CARD', 'ORDER', 'PIX']).required(),
  discount: yup.number().default(0).optional(),
})

export type ContractCreateSchemaType = yup.InferType<
  typeof ContractCreateSchema
>

export const ContractUpdateSchema = yup.object().shape({
  status: yup.string().default(''),
  description: yup.string().default(''),
  note: yup.string().default(''),
  startedIn: yup.date().optional(),
  period: yup.string().default(''),
  endedIn: yup.date().optional(),
  payment: yup.string().default(''),
  discount: yup.number().default(0),
})

export type ContractUpdateSchemaType = yup.InferType<
  typeof ContractUpdateSchema
>
