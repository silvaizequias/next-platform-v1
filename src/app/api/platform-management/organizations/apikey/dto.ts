import * as z from 'zod'

export const CreateOrganizationApiKeyDTO = z.object({
  document: z.string(),
  expireIn: z.coerce.date(),
})
export type CreateOrganizationApiKeyDTOType = z.infer<
  typeof CreateOrganizationApiKeyDTO
>
