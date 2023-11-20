import { Card, CardBody } from '@nextui-org/react'
import SignUpForm from '@/components/forms/auth/sign-up'

export default function SignInView() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col text-center">
          <Card className="min-w-[360px] sm:w-[400px] bg-slate-100 dark:bg-slate-900" isBlurred={true} shadow='md'>
            <CardBody>
              <SignUpForm />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
