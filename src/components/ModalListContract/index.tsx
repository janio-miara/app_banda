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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import api from '../../services/api'
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined'
import { useContractor } from '../../Providers/ContractorContext'
import { useAuth } from '../../Providers/AuthContext'

const ModalCreateContractor = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [valorCache, setValorCache] = useState<string>('')
  const { listContract } = useContractor()
  const { isAdmin } = useAuth()
  const handleClickOpen = () => {
    setOpen(true)
    setValorCache('')
    setName('')
    setPhone('')
    setAddress('')
    setLogoUrl('')
  }
  const handleClose = () => setOpen(false)

  const handleCreateContractor = async () => {
    if (!name) {
      alert("O campo 'Nome' é obrigatório.")
      return
    }

    try {
      await api.post(`contractors`, {
        name,
        address,
        phone,
        description,
        logoUrl,
        valorCache: parseFloat(valorCache.replace(/[R$.,]/g, '')) / 100 || 0, // Conversão para valor numérico
      })
      listContract()
      handleClose()
    } catch (e) {
      console.error(e)
    }
  }

  // Função de formatação para exibir o valor no formato de moeda
  const formatCurrency = (value: string) => {
    const numericValue = parseFloat(value.replace(/\D/g, '')) / 100
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  // Função para atualizar o valor com a formatação de moeda
  const handleChangeValorCache = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorCache(formatCurrency(event.target.value))
  }

  return (
    <>
      <Fab color="warning" aria-label="edit" size="small" onClick={handleClickOpen} disabled={!isAdmin}>
        <AddBusinessOutlinedIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" gap="8px" alignItems="center">
            <AddIcon />
            <Typography variant="h6" component="span">
              Criar Contratante
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box display="flex" flexDirection="column" gap="16px" mt={2}>
              <TextField
                label="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
                required
                variant="outlined"
              />
              <TextField
                label="Endereço"
                value={address}
                onChange={e => setAddress(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Telefone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />
              <TextField
                label="URL do Logo"
                value={logoUrl}
                onChange={e => setLogoUrl(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Valor Cache"
                value={valorCache}
                onChange={handleChangeValorCache}
                fullWidth
                variant="outlined"
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCreateContractor} color="primary" variant="contained">
            Criar Contratante
          </Button>
        </DialogActions>
        <br />
      </Dialog>
    </>
  )
}

export default ModalCreateContractor
