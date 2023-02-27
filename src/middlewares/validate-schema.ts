import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types'
import { OptionalObjectSchema, ObjectShape } from 'yup/lib/object'

export function validateSchema(
  schema: OptionalObjectSchema<ObjectShape>,
  handler: NextApiHandler
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    //@ts-ignore
    if (['POST', 'PATCH'].includes(req.method)) {
      try {
        req.body = await schema
          .camelCase()
          .validate(req.body, {
            strict: true,
            abortEarly: false,
            stripUnknown: true
          })
      } catch (error) {
        return res.status(400).send({ message: error })
      }
    }
    await handler(req, res)
  }
}
