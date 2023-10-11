import * as z from 'zod'

export const GeolocationSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})
export type GeolocationSchemaType = z.infer<typeof GeolocationSchema>
