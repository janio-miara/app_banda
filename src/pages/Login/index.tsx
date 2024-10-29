import React from 'react'
import { Container, TextField, Button, Box, Avatar, CircularProgress, Typography } from '@mui/material'
import { logoBanda, backgroundDark } from 'assets/images'
import api, { defaultsHeadersAxios } from '../../services/api'
import { setItem, setItemObjetc } from '../../utils/persistenceUtils'
import { TOKEN_KEY, USER_CONFIG } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Providers/AuthContext'

const Login: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  const { setIsAdmin, setUser } = useAuth()

  const logins = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = (await api.post('auth/login', { email, password })) as any
      setIsAdmin(data?.user?.role === 'admin')
      setUser(data?.user)
      await setItemObjetc(USER_CONFIG, data?.user)
      await setItem(TOKEN_KEY, data?.token)
      await defaultsHeadersAxios(data?.token)
      navigate('/dashboard')
    } catch (e: any) {
      setError('Login failed. Please check your credentials and try again.')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        backgroundImage: `url(${backgroundDark})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Avatar
          src={logoBanda}
          sx={{
            width: 300,
            height: 300,
            mb: 4, // Increase space between avatar and form
            animation: 'spin 5s linear infinite', // Add rotation animation
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={logins} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Box>
    </Container>
  )
}

export default Login
