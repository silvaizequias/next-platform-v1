import {
  Button,
  FormControl,
  Grid,
  ListItem,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'

export default function CreatePostForm() {
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <FormControl fullWidth>
            <Select size="small" value={''}>
              <MenuItem value={''}>{'categoria'}</MenuItem>
              <MenuItem value={''}>{'categoria'}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Button fullWidth variant="contained" size="small">
            Adicionar Categoria
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <TextField multiline minRows={5} size="small" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button fullWidth size="small" variant="contained">
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
