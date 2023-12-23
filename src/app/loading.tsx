import { Spinner } from '@material-tailwind/react'

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col text-center">
          <Spinner color="blue" className="h-12 w-12" />
        </div>
      </div>
    </div>
  )
}
