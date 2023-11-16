import { Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className="sm:h-screen h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col text-center">
          <Spinner size="lg" />
        </div>
      </div>
    </div>
  )
}
