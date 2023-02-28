import type { NextApiRequest, NextApiResponse } from 'next/types'
import headerAuthorization from 'src/pages/api/common/middlewares/header-authorization'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  const {} = req.body

  switch (method) {
    case 'GET':
      try {
        res.status(200).send({message: 'METHOD GET'})
      } catch (error) {
        return res.status(400).send({ message: error })
      }
      break
    case 'POST':
      try {
        res.status(200).send({message: 'METHOD POST'})
      } catch (error) {
        return res.status(400).send({ message: error })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      res.status(404).send({ message: 'Not found' })
  }
}

export default headerAuthorization(handler)
