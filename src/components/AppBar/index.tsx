import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import Fab from '@mui/material/Fab'
import fotoJanio from '../../assets/images/logo_banda.png'
import ModalCreateEvento from '../ModalCreateEvent'
import ModalCreateContractor from '../ModalListContract'
import ModalCreateUser from '../CreateUser'
import { useAuth } from '../../Providers/AuthContext'
import { useEvent } from '../../Providers/EventContext'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Card } from '@mui/material'
import { deleteItem } from '../../utils/persistenceUtils'
import { useNavigate } from 'react-router-dom'
import {Paragraph} from "w-design-system";

function ResponsiveAppBar() {
  const { user } = useAuth()
  const { events } = useEvent()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const navagete = useNavigate()
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleEditUser = () => {
    // Lógica para editar o usuário
    console.log('Editar usuário')
    handleCloseUserMenu()
  }

  const handleLogout = () => {
    // Lógica para sair
    deleteItem('app-band-user-config')
    deleteItem('app-band-token')
    navagete('/')
    handleCloseUserMenu()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '120px',
          background: '#09504c',
          padding: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <Fab aria-label="like" size={'small'}>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="Remy Sharp" src={fotoJanio} sx={{ width: 50, height: 50, background: 'black' }} />
            </IconButton>
          </Fab>
          <div>
            <Typography variant="h4">Olá!</Typography>
            <Typography>{user?.name} </Typography>
          </div>
        </div>
        <Box textAlign={'center'} sx={{ opacity: 0.5 }}>
          <IconButton onClick={handleOpenUserMenu}>{events?.length}</IconButton>
          <Paragraph size={'x-small'}>Eventos</Paragraph>
        </Box>
      </Box>

      <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
        <MenuItem onClick={handleEditUser}>Editar Usuário</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>

      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <ModalCreateUser />
        <ModalCreateEvento />
        <ModalCreateContractor />

        <Fab aria-label="like" size={'small'}>
          <CalendarMonthOutlinedIcon />
        </Fab>
      </Card>
    </div>
  )
}
export default ResponsiveAppBar
