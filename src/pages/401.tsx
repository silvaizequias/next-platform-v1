import { ReactNode } from 'react'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import Error401Page from 'src/views/pages/error/Error401Page'

const Error401 = () => {
  return <Error401Page />
}

Error401.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error401
