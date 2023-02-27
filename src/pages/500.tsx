import { ReactNode } from 'react'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import Error500Page from 'src/views/pages/error/Error500Page'

const Error500 = () => {
  return <Error500Page />
}

Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error500
