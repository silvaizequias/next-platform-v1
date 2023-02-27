import type { NextApiRequest, NextApiResponse } from 'next/'
import { getSession } from 'next-auth/react'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const { method } = req

  //@ts-ignore
  const data = session

  switch (method) {
    case 'GET':
      if (!session) return res.status(401).send({ message: 'Restrict access!' })
      try {
        res.status(200).send({ data })
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