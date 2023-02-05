import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types'
import jwt from 'jsonwebtoken'

interface IVerifiedUser {
  email: string
  role: string
  exp: number
}

const headerAuthorization =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const authorization = req.headers.authorization
    
    if (!authorization)
      return res.status(401).send({ message: 'Unauthorized!' })

    const [tokenType, token] = authorization.split(' ')
    if (tokenType.toLowerCase() !== 'bearer')
      return res.status(401).send({ message: 'Invalid Authentication Type' })

    try {
      const verified = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY ?? 'SOME_RANDOM_KEY'
      ) as IVerifiedUser

      const time = new Date().getTime()
      if (time >= verified.exp)
        return res.status(401).send({ message: 'Session Expired!' })

      //if(!verified.role) return res.status(401).send({message: 'Role Not Defined!'})
      return handler(req, res)
    } catch (error) {
      return res.status(406).send({ message: error })
    }
  }

export default headerAuthorization
