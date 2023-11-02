import { Button, FormControl, Grid, TextField } from '@mui/material'

export default function CreateCategoryForm() {
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <FormControl fullWidth>
            <TextField size="small" />
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
