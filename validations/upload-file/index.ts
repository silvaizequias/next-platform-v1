import * as z from 'zod'

export const UploadFileValidation = z.object({
  name: z.string(),
  bucket: z.string(),
})
export type UploadFileValidationType = z.infer<typeof UploadFileValidation>
