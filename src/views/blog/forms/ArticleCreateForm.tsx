import { useFetch } from '@/hooks/useFetch'
import { CreateArticleSchema, CreateArticleSchemaType } from '@/schemas/article'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ArticleCreateFormProps, ArticleType } from '../types'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function ArticleCreateForm(props: ArticleCreateFormProps) {
  const { userId, onClose } = props
  const { data, mutate } = useFetch<ArticleType[]>('/api/blog/articles')

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateArticleSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(CreateArticleSchema),
  })

  const onSubmit: SubmitHandler<CreateArticleSchemaType> = async (
    inputs,
    e,
  ) => {
    e?.preventDefault()

    try {
      await axios.post(`/api/blog/articles`, inputs).then(async (res: any) => {
        onClose()
        await mutate(...data!, res.data, {
          revalidate: true,
          rollbackOnError: true,
        })
        toast.success(`O artigo ${inputs?.title} foi publicado!`)
      })
    } catch (error: any) {
      toast.error(error?.message!)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input hidden value={userId!} />
      <FormControl fullWidth sx={{ my: 2 }}>
        <Controller
          {...register('subject')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Assunto'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.subject)}
              placeholder='Assunto'
            />
          )}
        />
        {errors.subject && (
          <FormHelperText>{errors.subject.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('title')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Título'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.title)}
              placeholder='Título'
            />
          )}
        />
        {errors.title && (
          <FormHelperText>{errors.title.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
      <FormLabel component='legend'>Resumo</FormLabel>
        <Controller
          {...register('resume')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <ReactQuill theme='snow' value={value} onChange={onChange} />
          )}
        />
        {errors.resume && (
          <FormHelperText>{errors.resume.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel component='legend'>Artigo</FormLabel>
        <Controller
          {...register('content')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <ReactQuill theme='snow' value={value} onChange={onChange} />
          )}
        />
        {errors.content && (
          <FormHelperText>{errors.content.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Controller
          {...register('tags')}
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label={'Tags'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.tags)}
              placeholder='Tags'
            />
          )}
        />
        {errors.tags && <FormHelperText>{errors.tags.message}</FormHelperText>}
      </FormControl>

      <Button
        fullWidth
        size='small'
        type='submit'
        variant='contained'
        color='success'
        sx={{ my: 2 }}
      >
        Criar Artigo
      </Button>
    </form>
  )
}
