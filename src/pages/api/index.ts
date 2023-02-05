import type { NextApiRequest, NextApiResponse } from 'next/types'
import { getToken } from 'next-auth/jwt'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({ req, secret })
  const { method } = req

  switch (method) {
    case 'GET':
      if (!token) return res.status(401).send({ message: 'Restrict access!' })
      try {
        res.status(200).send({ data: token })
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

export default handler
