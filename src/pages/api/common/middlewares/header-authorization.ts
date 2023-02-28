import axios from 'axios'
import { getSession } from 'next-auth/react'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types'

const headerAuthorization =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    const key = req.headers.key as string

    const endpoint = (process.env.NEXT_PUBLIC_MANAGER_API +
      `/auth/${key}`) as string
    const system = process.env.NEXT_PUBLIC_SYSTEM_NAME as string

    const time = new Date().getTime()

    try {
      if (session) {
        return handler(req, res)
      } else if (key) {
        const authorization = (await axios.get(endpoint)).data

        if (!authorization)
          return res.status(400).send({ message: 'Bad Request!' })

        const expireIn = new Date(authorization.expireIn).getTime()

        if (time >= expireIn)
          return res
            .status(403)
            .send({ message: `Forbidden, cause Key has been expired!` })

        if (!authorization.isActive)
          return res
            .status(403)
            .send({ message: `Forbidden, cause key has been deactivated!` })

        if (system !== authorization.system)
          return res
            .status(403)
            .send({
              message: `Forbidden, cause key hasn't compatible with this system!`,
            })

        return handler(req, res)
      }

      return res.status(401).send({ message: 'Unauthorized!' })
    } catch (error) {
      return res.status(406).send({ message: 'Not Acceptable', error })
    }
  }

export default headerAuthorization
