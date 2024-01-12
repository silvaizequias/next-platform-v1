'use client'
import { IdentificationIcon, UserPlusIcon } from '@heroicons/react/24/solid'
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-tailwind/react'

import { UserType } from './types'
import { useCallback, useState } from 'react'
import DialogContent from '@/components/dialog-content'
import UserCreateFormView from './views/UserCreateFormView'
import UserUpdateFormView from './views/UserUpdateFormView'

interface Props {
  users: UserType
}

export default function UserScreen(props: Props) {
  const { users } = props
  const [dialogCreate, setDialogCreate] = useState<boolean>(false)
  const [dialogDetail, setDialogDetail] = useState<boolean>(false)

  const handleDialogCreate = useCallback(() => {
    setDialogCreate(!dialogCreate)
  }, [dialogCreate])
  const handleDialogDetail = useCallback(() => {
    setDialogDetail(!dialogDetail)
  }, [dialogDetail])

  const logotipo = '/logotipo.svg'

  const TABLE_HEAD = ['usuário', 'perfil', 'status', '']
  const TABLE_ROWS: UserType[] = Object.create(users)

  return (
    <div className="p-6 mx-2 sm:mx-4">
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mx-auto flex items-center justify-between gap-8">
            <div className="lowercase">
              <Typography variant="h5" color="blue-gray">
                usuários da plataforma
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                color="light-green"
                onClick={handleDialogCreate}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> criar
                usuário
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ image, name, phone, profile, active }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50'

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={image || logotipo}
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {phone}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {profile}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={active ? 'ativo' : 'inativo'}
                            color={active ? 'green' : 'blue-gray'}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-2">
                          <Tooltip content="detalhes">
                            <IconButton variant="text">
                              <IdentificationIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  )
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <DialogContent open={dialogCreate} onClose={handleDialogCreate}>
        <UserCreateFormView />
      </DialogContent>
      <DialogContent open={dialogDetail} onClose={handleDialogDetail}>
        <UserUpdateFormView />
      </DialogContent>
    </div>
  )
}
