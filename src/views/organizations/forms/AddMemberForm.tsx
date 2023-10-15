import { OrganizationProps } from '../types'
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

export default function AddMemberForm(props: OrganizationProps) {
  const { organization } = props

  return (
    <form>
      <Grid container spacing={2} marginY={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField label={'Membro'} size={'small'} />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select size={'small'}>
              <FormLabel title='Função' />
              <MenuItem>...</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant={'contained'}
            color={'primary'}
            size={'small'}
          >
            Adicionar Membro
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
