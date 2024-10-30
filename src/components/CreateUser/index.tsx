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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import api from '../../services/api'
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined'
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { useAuth } from '../../Providers/AuthContext'

const ModalCreateUser = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [role, setRole] = useState('member')
  const [valorCache, setValorCache] = useState<string>('')
  const { isAdmin } = useAuth()

  const handleClickOpen = () => {
    setOpen(true)
    setName('')
    setEmail('')
    setPassword('')
    setAvatarUrl('')
  }
  const handleClose = () => setOpen(false)

  const handleCreateUser = async () => {
    if (!name || !email || !password) {
      alert("Os campos 'Nome', 'Email', 'Senha' e 'ID da Banda' são obrigatórios.")
      return
    }

    try {
      await api.post(`auth/register`, {
        name,
        email,
        password,
        bandId: Number(1),
        role,
        avatarUrl,
        valorCache: parseFloat(valorCache.replace(/[R$.,]/g, '')) / 100 || 0, // Conversão para valor numérico
      })
      handleClose()
    } catch (e) {
      console.error(e)
    }
  }

  // Função para formatar o valor como moeda
  const formatCurrency = (value: string) => {
    const numericValue = parseFloat(value.replace(/\D/g, '')) / 100
    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const handleChangeValorCache = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorCache(formatCurrency(event.target.value))
  }

  return (
    <>
      <Fab color="primary" aria-label="add" size="small" onClick={handleClickOpen} disabled={!isAdmin}>
        <PersonAddAlt1OutlinedIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" gap="8px" alignItems="center">
            <AddBusinessOutlinedIcon />
            <Typography variant="h6" component="span">
              Criar Usuário
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
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                required
                variant="outlined"
                type="email"
              />
              <TextField
                label="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                required
                variant="outlined"
                type="password"
              />
              <TextField
                label="URL do Avatar"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                fullWidth
                variant="outlined"
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select label="Role" value={role} onChange={e => setRole(e.target.value)} fullWidth>
                  <MenuItem value="member">Member</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
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
          <Button onClick={handleCreateUser} color="primary" variant="contained">
            Criar Usuário
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModalCreateUser
