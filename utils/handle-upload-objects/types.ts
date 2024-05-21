export type HandleUploadFileType = {
  data: FormData
  name?: string
}

export type HandleUploadImageType = {
  imageUrl: string
  param: 'attachment' | 'organization' | 'user'
  paramId?: string
}
