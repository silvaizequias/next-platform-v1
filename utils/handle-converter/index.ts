'use server'

import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/libraries/next-auth'
import { parse } from 'csv-parse'

export const csvToJsonConverter = async (data: FormData) => {
  const session = await getServerSession(nextAuthOptions)

  try {
    if (!session) return null

    const file: File | null = (data.get('file') as File) || null
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    return await new Promise((resolve, reject) => {
      parse(
        buffer,
        {
          columns: true,
          skip_empty_lines: true,
          skip_records_with_empty_values: true,
          skip_records_with_error: true,
        },
        (error, records) => {
          if (error) reject(error)
          else resolve(records)
        },
      )
    })
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}
