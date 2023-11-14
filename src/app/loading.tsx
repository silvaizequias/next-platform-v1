import { Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-8">
        <div className="flex flex-col text-center">
          <Spinner size="lg" />
        </div>
      </div>
    </div>
  )
}
