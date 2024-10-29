import React from 'react'
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
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import DirectionsBusOutlinedIcon from '@mui/icons-material/DirectionsBusOutlined'
import api from '../../services/api'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'
import { formatCurrency, parseCurrency } from '../../utils/helpes'
import { useContractor } from '../../Providers/ContractorContext'
import { useEvent } from '../../Providers/EventContext'
import { useAuth } from '../../Providers/AuthContext'

interface ModalDetalhesEventoProps {
  open: boolean
  handleClose: () => void
  event: any
}

const ModalDetalhesEvento: React.FC<ModalDetalhesEventoProps> = ({ open, handleClose, event }) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(event?.dataEvento))
  const [horaMontagem, setHoraMontagem] = React.useState<Dayjs | null>(
    event?.horaMontagem ? dayjs(event?.horaMontagem) : null
  )
  const [horaPassagemSom, setHoraPassagemSom] = React.useState<Dayjs | null>(
    event.horaPassagemSom ? dayjs(event.horaPassagemSom) : null
  )
  const [horaShow, setHoraShow] = React.useState<Dayjs | null>(event.horaShow ? dayjs(event.horaShow) : null)
  const [contratante, setContratante] = React.useState(event.contratante.id)
  const [nome, setNome] = React.useState(event.nome)
  const [statusEvento, setStatusEvento] = React.useState(event.statusEvento)
  const [descricao, setDescricao] = React.useState(event.descricao)
  const [alimentacaoInclusa, setAlimentacaoInclusa] = React.useState(event.alimentacaoInclusa)
  const [vanInclusa, setVanInclusa] = React.useState(event.vanInclusa)
  const [valor, setValor] = React.useState(event.valor || 1800)
  const { contractors } = useContractor()
  const { listEvent } = useEvent()
  const { isAdmin } = useAuth()
  const updateEvent = async () => {
    try {
      await api.put(`eventos/${event.id}`, {
        nome,
        descricao,
        dataEvento: selectedDate?.toISOString(),
        horaMontagem: horaMontagem ? horaMontagem.toISOString() : null,
        horaPassagemSom: horaPassagemSom ? horaPassagemSom.toISOString() : null,
        horaShow: horaShow ? horaShow.toISOString() : null,
        statusEvento,
        contratanteId: contratante,
        alimentacaoInclusa,
        vanInclusa,
        valor: parseCurrency(valor),
      })
      listEvent()
    } catch (e: any) {
      console.log(e)
    }
  }

  const handleChangeValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(formatCurrency(event.target.value))
  }

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle>
        <Box display="flex" gap="8px" alignItems="center">
          <EditCalendarOutlinedIcon />
          <Typography variant="h6" component="span">
            Detalhes do Evento
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box display="flex" flexDirection="column" gap="16px" mt={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Contratante</InputLabel>
              <Select
                label="Contratante"
                value={contratante}
                onChange={e => setContratante(e.target.value)}
                fullWidth
                disabled={!isAdmin}
              >
                {contractors.map((contractor: any) => (
                  <MenuItem key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              fullWidth
              disabled={!isAdmin}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <Box display="flex" flexDirection="column" gap={2}>
                <DatePicker
                  label="Data do Evento"
                  value={selectedDate}
                  disabled={!isAdmin}
                  onChange={newValue => setSelectedDate(newValue)}
                  renderInput={(params: any) => <TextField {...params} fullWidth disabled={!isAdmin} />}
                />
                <TimePicker
                  label="Hora de Montagem"
                  value={horaMontagem}
                  disabled={!isAdmin}
                  onChange={newValue => setHoraMontagem(newValue)}
                  renderInput={(params: any) => <TextField {...params} fullWidth disabled={!isAdmin} />}
                />
                <TimePicker
                  label="Hora de Passagem de Som"
                  value={horaPassagemSom}
                  disabled={!isAdmin}
                  onChange={newValue => setHoraPassagemSom(newValue)}
                  renderInput={(params: any) => <TextField {...params} fullWidth disabled={!isAdmin} />}
                />
                <TimePicker
                  label="Hora do Show"
                  disabled={!isAdmin}
                  value={horaShow}
                  onChange={newValue => setHoraShow(newValue)}
                  renderInput={(params: any) => <TextField {...params} fullWidth disabled={!isAdmin} />}
                />
              </Box>
            </LocalizationProvider>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box textAlign="center">
                <Checkbox
                  checked={alimentacaoInclusa}
                  onChange={e => setAlimentacaoInclusa(e.target.checked)}
                  icon={<RestaurantOutlinedIcon fontSize="large" />}
                  checkedIcon={<RestaurantIcon fontSize="large" />}
                  disabled={!isAdmin}
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
                  disabled={!isAdmin}
                />
                <Typography variant="caption">{vanInclusa ? 'Com Van' : 'Sem Van'}</Typography>
              </Box>
            </Box>
            {isAdmin && (
              <TextField
                label="Valor do Evento (R$)"
                value={valor}
                onChange={handleChangeValor}
                fullWidth
                margin="dense"
                disabled={!isAdmin}
              />
            )}

            <TextField
              label="Descrição"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              fullWidth
              disabled={!isAdmin}
              multiline
              rows={4}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
        {isAdmin && (
          <Button onClick={updateEvent} color="primary">
            Salvar
          </Button>
        )}
      </DialogActions>
      <br />
    </Dialog>
  )
}

export default ModalDetalhesEvento
