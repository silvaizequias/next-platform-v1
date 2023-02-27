import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    TextField,
    Typography
  } from '@mui/material'
  import { useRouter } from 'next/router'
  
  import Link from 'next/link'
  
  import * as yup from 'yup'
  import { useForm, Controller, SubmitHandler } from 'react-hook-form'
  import { yupResolver } from '@hookform/resolvers/yup'
  
  import axios from 'axios'
  
  import toast from 'react-hot-toast'
  
  type InputForm = {
    email: string
    phone: string
  }
  
  export default function ForgotPasswordForm() {
    const router = useRouter()
  
    const validationSchema = yup.object().shape({
      email: yup.string().email().required(),
      phone: yup.string().min(11).max(12).required()
    })
  
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm<InputForm>({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema)
    })
  
    const endpoint = process.env.NEXT_PUBLIC_MANAGER_API + '/auth/resetpass'
    const onSubmit: SubmitHandler<InputForm> = async (inputs) => {
      await axios
        .post(endpoint, inputs)
        .then(function (response) {
          reset()
          router.push('/auth')
          toast.success(`A nova senha foi enviada para o e-mail ${response.data.email}!`)
        })
        .catch(function (error) {
          toast.error(`${error.response.data.error}: ${error.response.data.message}!`)
        })
    }
  
    return (
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label='E-mail'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.email)}
                placeholder='seu@email.com'
              />
            )}
          />
          {errors.email && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {errors.email.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Controller
            name='phone'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextField
                autoFocus
                label='Celular'
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                error={Boolean(errors.phone)}
                placeholder='11 98765 4321'
              />
            )}
          />
          {errors.phone && (
            <FormHelperText sx={{ color: 'error.main' }}>
              {errors.phone.message}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          color='warning'
          sx={{ mb: 7 }}
        >
          Redefinir a Senha
        </Button>
        <Divider
          sx={{
            '& .MuiDivider-wrapper': { px: 4 },
            mt: (theme) => `${theme.spacing(5)} !important`,
            mb: (theme) => `${theme.spacing(7.5)} !important`
          }}
        >
          ou
        </Divider>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <Typography sx={{ mr: 2, color: 'text.secondary' }}>
            se mudou de ideia,
          </Typography>
          <Typography
            href='/auth'
            component={Link}
            sx={{ color: 'primary.main', textDecoration: 'none' }}
          >
            autenticar-se
          </Typography>
        </Box>
      </form>
    )
  }