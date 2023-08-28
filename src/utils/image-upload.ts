import { storage } from '@/libraries/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const imageUpload = async (file: any) => {
  const uploadRef = ref(storage, `users/avatar/${file?.name}`)

  try {
    return await uploadBytes(uploadRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        url
      })
    })
  } catch (error: any) {
    console.error(error?.message || error)
    return error?.message || error
  }
}
