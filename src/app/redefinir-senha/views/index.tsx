import { Card, CardBody } from '@nextui-org/react'
import ForgotPasswordForm from '@/components/forms/auth/forgot-password'

export default function ForgotPasswordView() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:mx-8 mx-2">
        <div className="flex flex-col text-center">
          <Card
            className="min-w-[360px] sm:w-[400px] bg-slate-100 dark:bg-slate-900"
            isBlurred={true}
            shadow="md"
          >
            <CardBody>
              <ForgotPasswordForm />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
