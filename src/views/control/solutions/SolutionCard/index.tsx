import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { SolutionCardProps } from '../types'
import { MdGppGood, MdGppMaybe } from 'react-icons/md'
import { green, red } from '@mui/material/colors'

export default function SolutionCard(props: SolutionCardProps) {
  const { solution } = props

  return (
    <Card>
      <CardActionArea>
        <CardContent
          sx={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24
          }}
        >
          <Typography variant='body1' mr={2}>
            {solution?.name}
          </Typography>
          {solution?.isActive! ? (
            <Stack color={green[400]}>
              <MdGppGood />
            </Stack>
          ) : (
            <Stack color={red[400]}>
              <MdGppMaybe />
            </Stack>
          )}
        </CardContent>
        <CardContent sx={{my: 0}}>
          <Typography variant='body2' color='text.secondary'>
            {solution?.url!}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {solution?.cloud!}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
