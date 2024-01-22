'use client'

import useFetch from '@/hooks/use-fetch'
import { Button } from '@material-tailwind/react'
import { Session } from 'next-auth'
import { OrganizationUsersType } from '../../organizations/types'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import DialogModal from '@/components/dialog-modal'
import CreateMyOrganizationForm from './form'

interface Props {
  session: Session
}

export default function MyOrganizationListView(props: Props) {
  const { session } = props
  const { data } = useFetch<OrganizationUsersType[] | any>(
    '/api/organization-users',
  )

  const router = useRouter()

  const [openDialogCreate, setOpenDialogCreate] = useState<boolean>(false)

  const handleDialogCreate = useCallback(() => {
    setOpenDialogCreate(!openDialogCreate)
  }, [openDialogCreate])

  const handleClick = useCallback(
    (document: string) => {
      document && router.push(`organizations/${document}`)
    },
    [router],
  )

  return (
    <div className="flex flex-col justify-center gap-2">
      <h6 className="py-2 text-lg text-center font-semibold lowercase">
        minhas organizações
      </h6>
      {data &&
        data.map(
          (organizationUsers: OrganizationUsersType) =>
            organizationUsers.userId == session?.user?.id && (
              <div
                key={organizationUsers?.id}
                className="bg-blue-200 rounded p-2 cursor-pointer hover:opacity-90 hover:shadow-xl"
                onClick={() =>
                  handleClick(organizationUsers?.organization?.documentCode)
                }
              >
                <div className="flex flex-col">
                  <h6 className="text-lg font-medium lowercase">
                    {organizationUsers?.organization?.name}
                  </h6>
                  <p className="text-base font-thin lowercase">
                    {organizationUsers.role}
                  </p>
                </div>
              </div>
            ),
        )}
      <Button color="green" onClick={handleDialogCreate}>
        criar organização
      </Button>
      <DialogModal
        onClose={handleDialogCreate}
        open={openDialogCreate}
        title="dedicado"
        content="criar minha organização na plataforma"
      >
        <CreateMyOrganizationForm session={session} />
      </DialogModal>
    </div>
  )
}
