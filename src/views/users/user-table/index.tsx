'use client'

import React, { useCallback, useMemo, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
} from '@nextui-org/react'
import { columns, users } from './data'
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2'

const statusColorMap: any = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

export default function UserTable() {
  const [page, setPage] = useState<number>(1)
  const rowsPerPage = 10

  const pages = Math.ceil(users.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return users.slice(start, end)
  }, [page])

  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        )
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        )
      case 'status':
        return (
          <Chip
            className="uppercase"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalhes">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <HiOutlineEye />
              </span>
            </Tooltip>
            <Tooltip content="Editar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <HiOutlinePencil />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Remover">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <HiOutlineTrash />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table 
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px] dark:bg-slate-800 bg-slate-200',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
