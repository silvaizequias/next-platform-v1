import { useEffect, useState } from 'react'
import { DataTableProps } from './types'
import { DataGrid } from '@mui/x-data-grid'

export default function DataTable(props: DataTableProps) {
  const { data, columns } = props
  const [rows, setRows] = useState([])

  useEffect(() => {
    const userData = async () => {
      setRows(data!)
    }
    if (data) {
      userData()
    }
  }, [data])

  return (
    <DataGrid
      getRowId={(row) => row.id}
      rows={rows!}
      columns={columns!}
      disableColumnSelector
    />
  )
}
