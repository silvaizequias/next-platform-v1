import * as React from 'react'
import { styled } from '@mui/material/styles'

import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { blue, grey } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ShowPostCardProps } from './types'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material'
import { MdRemoveRedEye } from 'react-icons/md'
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

export default function ShowPostCard(props: ShowPostCardProps) {
  const { post } = props
  const [expanded, setExpanded] = useState<boolean>(false)

  const router = useRouter()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handlePostView = () => {
    router.push(`/blog/${post?.slug}`)
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
            backgroundImage: `url(${post?.image! || '/bg.jpg'})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          onClick={handlePostView}
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
              {post?.title}
            </Typography>
            <Divider sx={{ color: grey[50], fontSize: 12, m: 2  }}>
              {new Date(post?.createdAt).toLocaleDateString()}
            </Divider>
          </Box>
        </Box>

        {post?.resume! && (
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
            <Typography variant='caption'>Resumo</Typography>
            <Typography paragraph textAlign='justify'>
              {post?.resume!}
            </Typography>
          </CardContent>
        </Collapse>
      </CardActionArea>
    </Card>
  )
}
