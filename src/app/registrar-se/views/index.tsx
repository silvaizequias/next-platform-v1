import { Card, CardBody } from '@nextui-org/react'
import SignUpForm from '@/components/forms/auth/sign-up'

export default function SignInView() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col text-center">
          <Card className="max-w-[600px] bg-slate-200 dark:bg-slate-800">
            <CardBody>
              <SignUpForm />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
