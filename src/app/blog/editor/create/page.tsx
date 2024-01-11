import { Fragment } from 'react'
import EditorPostCreateScreen from './screen'

export default async function EditorPostCreatePage() {
  return (
    <Fragment>
      <div className="max-w-full py-10">
        <div className="flex flex-1 flex-col justify-center gap-4 ">
          <div className="p-6 mx-2 sm:mx-4">
            <EditorPostCreateScreen />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
