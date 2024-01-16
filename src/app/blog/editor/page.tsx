import { Fragment } from 'react'
import { actionGetPublications } from '../actions'
import { PublicationType } from '../types'
import EditorScreen from './screen'

export default async function EditorPage() {
  const publications: PublicationType[] | any = await actionGetPublications()

  return (
    <Fragment>
      <div className="max-w-full py-10">
        <div className="flex flex-1 flex-col justify-center gap-4 ">
          <EditorScreen publications={publications} />
        </div>
      </div>
    </Fragment>
  )
}
