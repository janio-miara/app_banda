import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Box,
  Fab,
  InputLabel,
  FormControl,
  Typography,
  Checkbox,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined'
import { useContractor } from '../../Providers/ContractorContext'
import api from '../../services/api'
import { formatCurrency, parseCurrency } from '../../utils/helpes'
import ModalCreateContractor from '../ModalListContract'
import { useEvent } from '../../Providers/EventContext'
import { useAuth } from '../../Providers/AuthContext'
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";

interface IEvent {
    showModalEvent: boolean
    setShowModalEvent: any
}

const ModalCreateEvento = ({showModalEvent, setShowModalEvent}: IEvent) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [horaMontagem, setHoraMontagem] = useState<Dayjs | null>(null)
  const [horaPassagemSom, setHoraPassagemSom] = useState<Dayjs | null>(null)
  const [horaShow, setHoraShow] = useState<Dayjs | null>(null)
  const [contratante, setContratante] = useState('')
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [statusEvento, setStatusEvento] = useState('Agendado')
  const [alimentacaoInclusa, setAlimentacaoInclusa] = useState(false)
  const [vanInclusa, setVanInclusa] = useState(false)
  const [valor, setValor] = useState('') // Valor com máscara inicial
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [showModalContractor, setShowModalContractor] = useState(false);

  const { contractors } = useContractor()
  const { listEvent } = useEvent()
  const { isAdmin } = useAuth()
  const handleClose = () =>  {
    setSelectedDate(null)
    setHoraMontagem(null)
    setHoraPassagemSom(null)
    setHoraShow(null)
    setContratante('')
    setNome('')
    setDescricao('')
    setStatusEvento('Agendado')
    setAlimentacaoInclusa(false)
    setVanInclusa(false)
    setValor('')
    setShowModalEvent(false)
  }

  useEffect(() => {
    setIsButtonDisabled(!contratante || !selectedDate)
  }, [contratante, selectedDate])

  const handleChangeValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(formatCurrency(event.target.value))
  }

  const updateEvent = async () => {
    if (!contratante || !selectedDate) return

    try {
      await api.post(`eventos`, {
        nome: nome || 'Evento sem nome',
        descricao: descricao || 'Sem descrição',
        dataEvento: selectedDate?.toISOString(), // Converte para ISO 8601 (timestamp)
        horaMontagem: horaMontagem ? horaMontagem.toISOString() : null, // Converte para ISO 8601 ou null
        horaPassagemSom: horaPassagemSom ? horaPassagemSom.toISOString() : null, // Converte para ISO 8601 ou null
        horaShow: horaShow ? horaShow.toISOString() : null, // Converte para ISO 8601 ou null
        statusEvento,
        contratanteId: contratante,
        alimentacaoInclusa,
        vanInclusa,
        valor: parseCurrency(valor) || 0, // Removendo caracteres e convertendo para número
      })
      listEvent()
      handleClose()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Dialog open={showModalEvent} onClose={handleClose} fullScreen>
        <DialogTitle>
          <Box display="flex" gap="8px" alignItems="center">
            <EditCalendarOutlinedIcon />
            <Typography variant="h6" component="span">
              Criar Evento
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box display="flex" flexDirection="column" gap="16px" mt={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Contratante</InputLabel>
                <Select value={contratante} onChange={e => setContratante(e.target.value)} label="Contratante">
                  <MenuItem value="" disabled>
                    Selecione um contratante
                  </MenuItem>
                  {contractors?.map(contractor => (
                    <MenuItem key={contractor.id} value={contractor.id}>
                      {contractor.name}
                    </MenuItem>
                  ))}
                </Select>
                <Fab color="warning" aria-label="edit" size="small" onClick={() => setShowModalContractor(true)} disabled={!isAdmin}>
                  <AddBusinessOutlinedIcon />
                </Fab>
              </FormControl>

              <TextField
                label="Nome do Evento"
                placeholder="Insira o nome do evento"
                value={nome}
                onChange={e => setNome(e.target.value)}
                fullWidth
                margin="dense"
                variant="outlined"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                  label="Data do Evento"
                  value={selectedDate}
                  onChange={newValue => setSelectedDate(newValue)}
                  minDate={dayjs()}
                  views={['year', 'month', 'day']}
                  {...({ renderInput: (params: any) => <TextField {...params} fullWidth disabled={!isAdmin} /> } as any)}
                />
                <MobileTimePicker
                  label="Hora de Montagem"
                  value={horaMontagem}
                  onChange={newValue => setHoraMontagem(newValue)}
                  {...({ renderInput: (params: any) => <TextField {...params} fullWidth disabled={!isAdmin} /> } as any)}
                />
                <MobileTimePicker
                  label="Hora de Passagem de Som"
                  value={horaPassagemSom}
                  onChange={newValue => setHoraPassagemSom(newValue)}
                  {...({ renderInput: (params: any) => <TextField {...params} fullWidth disabled={!isAdmin} /> } as any)}
                />
                <MobileTimePicker
                  label="Hora do Show"
                  value={horaShow}
                  onChange={newValue => setHoraShow(newValue)}
                  {...({ renderInput: (params: any) => <TextField {...params} fullWidth disabled={!isAdmin} /> } as any)}
                />
              </LocalizationProvider>

              <FormControl fullWidth variant="outlined">
                <InputLabel>Status do Evento</InputLabel>
                <Select value={statusEvento} onChange={e => setStatusEvento(e.target.value)} label="Status do Evento">
                  <MenuItem value="Confirmado">Confirmado</MenuItem>
                  <MenuItem value="Agendado">Agendado</MenuItem>
                  <MenuItem value="Cancelado">Cancelado</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Valor do Evento (R$)"
                value={valor}
                onChange={handleChangeValor}
                fullWidth
                margin="dense"
                variant="outlined"
              />

              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Box textAlign="center">
                  <Checkbox
                    checked={alimentacaoInclusa}
                    onChange={e => setAlimentacaoInclusa(e.target.checked)}
                    icon={<RestaurantOutlinedIcon fontSize="large" />}
                    checkedIcon={<RestaurantIcon fontSize="large" />}
                  />
                  <Typography variant="caption">
                    {alimentacaoInclusa ? 'Alimentação Inclusa' : 'Sem Alimentação'}
                  </Typography>
                </Box>

                <Box textAlign="center">
                  <Checkbox
                    checked={vanInclusa}
                    onChange={e => setVanInclusa(e.target.checked)}
                    icon={<DirectionsBusOutlinedIcon fontSize="large" />}
                    checkedIcon={<DirectionsBusIcon fontSize="large" />}
                  />
                  <Typography variant="caption">{vanInclusa ? 'Com Van' : 'Sem Van'}</Typography>
                </Box>
              </Box>

              <TextField
                label="Descrição"
                placeholder="Descreva os detalhes do evento"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                fullWidth
                margin="dense"
                multiline
                rows={4}
                variant="outlined"
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={updateEvent} color="primary" variant="contained" disabled={isButtonDisabled}>
            Criar Evento
          </Button>
        </DialogActions>
        <br />
      </Dialog>
      <ModalCreateContractor showModalContractor={showModalContractor} setShowModalContractor={setShowModalContractor}/>

    </>
  )
}

export default ModalCreateEvento
