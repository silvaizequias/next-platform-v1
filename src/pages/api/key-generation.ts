import type { NextApiRequest, NextApiResponse } from 'next/'
import headerAuthorization from 'src/pages/api/common/middlewares/header-authorization'

import crypto from 'crypto'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      const key = await crypto.randomBytes(16).toString('hex')
      try {
        res.status(200).send({ message: `Key ${key} has been generate!` })
      } catch (error) {
        return res.status(400).send({ message: error })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.status(404).send({ message: 'Not found' })
  }
}

export default headerAuthorization(handler)
