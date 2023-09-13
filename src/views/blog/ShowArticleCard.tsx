import * as React from 'react'
import { styled } from '@mui/material/styles'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { grey } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ShowArticleCardProps } from './types'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function ShowArticleCard(props: ShowArticleCardProps) {
  const { article } = props
  const [expanded, setExpanded] = useState<boolean>(false)

  const router = useRouter()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleArticleView = () => {
    router.push(`/blog/${article?.slug}`)
  }

  return (
    <Card>
      <CardActionArea>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 220,
            bgcolor: 'hsl(0, 0%, 55%)',
            backgroundBlendMode: 'color-burn',
            backgroundImage: `url(${article?.image! || '/bg.jpg'})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          onClick={handleArticleView}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant='h5'
              fontWeight='600'
              textAlign='center'
              textTransform='uppercase'
              color={grey[50]}
              paddingX={2}
            >
              {article?.title}
            </Typography>
            <Divider sx={{ color: grey[50], fontSize: 12, m: 2  }}>
              {new Date(article?.createdAt).toLocaleDateString()}
            </Divider>
          </Box>
        </Box>

        {article?.resume! && (
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        )}
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography variant='button'>Resumo</Typography>
            <Typography variant='caption' paragraph textAlign='justify'>
              {article?.resume!}
            </Typography>
          </CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  )
}
