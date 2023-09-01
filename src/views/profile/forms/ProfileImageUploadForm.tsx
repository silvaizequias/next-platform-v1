import { Fragment, useState } from 'react'
import { ProfileImageUploadFormProps, ProfileProps } from '../types'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material'
import { storage } from '@/libraries/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ProfileUpdateSchemaType } from '@/schemas/profile'
import { useFetch } from '@/hooks/useFetch'
import axios from 'axios'
import ProgressBar from '@/components/ProgressBar'
import toast from 'react-hot-toast'

export default function ProfileImageUploadForm(
  props: ProfileImageUploadFormProps,
) {
  const { onClose, profile } = props
  const { data, mutate } = useFetch(`/api/profile/${profile?.id}`)

  const [selectedFile, setSelectedFile] = useState<File>()
  const [progressUpload, setProgressUpload] = useState<number>()
  const [imageUrl, setImageUrl] = useState<string>()

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 500000) {
      setSelectedFile(files[0])
    } else {
      toast.error('O arquivo escolhido é maior que 5MB!')
    }
  }

  const handleImageStorage = () => {
    if (selectedFile) {
      const { name } = selectedFile
      const storageRef = ref(storage, `users/${profile?.id}/avatar/${name}`)
      const sendFile = uploadBytesResumable(storageRef, selectedFile)
      sendFile.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgressUpload(progress)
          switch (snapshot.state) {
            case 'paused':
              toast.error('Envio pausado...')
              break
            case 'running':
              toast.success('Enviando imagem para o repositório!')
              break
          }
        },
        (error) => {
          toast.error(error?.message)
          console.error(error?.message)
        },
        () => {
          getDownloadURL(sendFile.snapshot.ref).then((url) => {
            setImageUrl(url)
          })
        },
      )
    } else {
      toast.error('Arquivo não encontrado!')
    }
  }

  const handleRemoveFile = () => {
    setImageUrl(undefined)
  }

  const handleImageUpload = async () => {
    if (imageUrl) {
      const inputs: ProfileUpdateSchemaType = {
        avatar: imageUrl,
      }

      await axios
        .patch(`/api/profile/${profile?.id}`, inputs)
        .then(async (res) => {
          onClose()
          toast.success('A imagem foi atualizada!')
          await mutate(...data, res.data, {
            revalidate: true,
            rollbackOnError: true,
          })
        })
        .catch((error: any) => {
          console.error(error?.message || error)
        })
    }
  }

  return (
    <Card elevation={0}>
      <CardMedia
        component='img'
        alt={profile?.name}
        height='400'
        image={!imageUrl ? profile?.avatar || '/avatar.png' : imageUrl}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stack sx={{ py: 2 }}>
          <input
            type='file'
            placeholder='Carregar arquivo...'
            accept='image/*'
            onChange={(files) => handleSelectedFile(files.target.files)}
          />
        </Stack>

        {progressUpload ? <ProgressBar prevProgress={progressUpload} /> : null}
      </CardContent>
      <CardActions>
        {selectedFile &&
          (!imageUrl ? (
            <Button
              fullWidth
              size='small'
              variant='outlined'
              color='primary'
              onClick={handleImageStorage}
            >
              Carregar Arquivo
            </Button>
          ) : (
            <Fragment>
              <Button
                fullWidth
                size='small'
                variant='outlined'
                color='warning'
                onClick={handleRemoveFile}
              >
                Alterar Arquivo
              </Button>
              <Button
                fullWidth
                size='small'
                variant='contained'
                color='success'
                onClick={handleImageUpload}
              >
                Atualizar
              </Button>
            </Fragment>
          ))}
      </CardActions>
    </Card>
  )
}
