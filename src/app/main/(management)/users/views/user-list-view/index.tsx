'use client'

import useFetch from '@/hooks/use-fetch'
import { UserType } from '../../types'
import { useCallback, useState } from 'react'
import DialogModal from '@/components/dialog-modal'
import CreateUserForm from './form'

export default function UserListView() {
  const { data: users } = useFetch<UserType[] | any>('/api/users')

  const [openDialogCreate, setOpenDialogCreate] = useState<boolean>(false)
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false)
  const [data, setData] = useState<UserType | any>(null)

  const handleDialogCreate = useCallback(() => {
    setOpenDialogCreate(!openDialogCreate)
  }, [openDialogCreate])
  const handleDialogUpdate = useCallback(
    (data: UserType) => {
      setData(data)
      setOpenDialogUpdate(!openDialogUpdate)
    },
    [openDialogUpdate],
  )
  const handleOnCloseDialog = useCallback(() => {
    setOpenDialogUpdate(!openDialogUpdate)
  }, [openDialogUpdate])

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex flex-auto justify-between items-center">
        <h6 className="py-2 text-lg text-left font-semibold lowercase">
          lista de usuários
        </h6>
        <div className="flex flex-shrink">
          <button
            className="text-xs bg-green-400 opacity-bg-80 hover:opacity-100 my-2 p-2 rounded shadow hover:shadow-lg hover:text-slate-200"
            onClick={handleDialogCreate}
          >
            criar usuário
          </button>
        </div>
      </div>
      <div className="py-4">
        {users &&
          users?.map((user: UserType) => (
            <div
              key={user?.id}
              className="cursor-pointer hover:shadow-lg"
              onClick={() => handleDialogUpdate(user)}
            >
              <div className="p-2 my-2 bg-cyan-600 hover:bg-opacity-60 dark:bg-cyan-800 dark:hover:bg-opacity-80 rounded">
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-base font-medium">{user?.name}</span>
                    <span className="text-xs font-thin">{user?.profile}</span>
                  </div>
                  <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <DialogModal
        open={openDialogCreate}
        onClose={handleDialogCreate}
        title="criar usuário"
      >
        <CreateUserForm />
      </DialogModal>
      <DialogModal
        open={openDialogUpdate}
        onClose={handleOnCloseDialog}
        title={data?.name}
      />
    </div>
  )
}
