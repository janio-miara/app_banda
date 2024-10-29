import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Fab,
  Typography,
  IconButton,
} from '@mui/material'
import api from '../../services/api'
import { useAuth } from '../../Providers/AuthContext'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEvent } from '../../Providers/EventContext'

const ModalDeleteEvent = ({ event }: any) => {
  const [open, setOpen] = useState(false)

  const { listEvent } = useEvent()
  const { isAdmin } = useAuth()

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  const deleteEvent = async () => {
    try {
      await api.delete(`eventos/${event?.id}`)
      listEvent()
      handleClose()
    } catch (e) {
      console.error(e)
      handleClose()
    }
  }

  return (
    <>
      <IconButton aria-label="delete" size="small" onClick={handleClickOpen} disabled={!isAdmin}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" gap="8px" alignItems="center">
            <Typography variant="h6" component="span">
              Deseja Excluir esse Evento
            </Typography>
          </Box>
          <Box display="flex" gap="8px" alignItems="center">
            <Typography variant="h6" component="span">
              {event.name}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={deleteEvent} color="primary" variant="contained">
            Deletar Evento
          </Button>
        </DialogActions>
        <br />
      </Dialog>
    </>
  )
}

export default ModalDeleteEvent
