import { ReactNode } from 'react'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import Error404Page from 'src/views/pages/error/Error404Page'

const Error404 = () => {
  return <Error404Page />
}

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error404
