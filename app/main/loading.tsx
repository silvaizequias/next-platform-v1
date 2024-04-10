import LoadingDisplay from '@/components/LoadingDisplay'
import { memo } from 'react'

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <LoadingDisplay />
    </div>
  )
}

export default memo(LoadingPage)
