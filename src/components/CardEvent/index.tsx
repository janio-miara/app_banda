import React, { useState } from 'react'
import { Box, Card, CardContent, Divider, IconButton, Typography } from '@mui/material'
import { formatHora } from '../../utils/helpes'
import {Container, ContainerHora, WrapperHora} from './styles'
import ModalDetalhesEvento from '../ModalDetalhesEvento'
import DeleteIcon from '@mui/icons-material/Delete'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useAuth } from '../../Providers/AuthContext'
import ModalDeleteEvent from '../ModalDelterEvento'

const CardEvent = ({ event }: any) => {
  const { isAdmin } = useAuth()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Container>
          <Box display="flex" justifyContent={'space-between'} gap="8px" alignItems={'center'}>
            <div>
              <Typography variant="h6" sx={{opacity: 0.6}}><b>{new Date(event.dataEvento).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' })}</b>
            </Typography>
            <Typography variant="body2"> {event.contratante.name}</Typography>
            </div>
            <Box display="flex" justifyContent={'space-between'} gap="8px" alignItems={'center'}>
              <IconButton aria-label="delete" size="small" onClick={handleClickOpen}>
                <InfoOutlinedIcon />
              </IconButton>
              <ModalDeleteEvent event={event} />
            </Box>
          </Box>
          <Divider />
          <WrapperHora>
            <ContainerHora>
              <Typography variant="body2"> {formatHora(event.horaMontagem)}</Typography>
              <Typography variant="caption" alignItems={'center'} color={'info'}>
                MONTAGEM
              </Typography>
            </ContainerHora>
            <ContainerHora>
              <Typography variant="body2"> {formatHora(event.horaPassagemSom)}</Typography>
              <Typography variant="caption" alignItems={'center'} color={'info'}>
                PASSAGEM
              </Typography>
            </ContainerHora>
            <ContainerHora>
              <Typography variant="body2"> {formatHora(event.horaShow)}</Typography>
              <Typography variant="caption" alignItems={'center'} color={'info'}>
                SHOW
              </Typography>
            </ContainerHora>
          </WrapperHora>
      </Container>
      <ModalDetalhesEvento event={event} open={open} handleClose={handleClose} />
    </>
  )
}

export default CardEvent
