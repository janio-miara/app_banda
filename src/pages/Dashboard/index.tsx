import * as React from 'react'
import { useEffect, useState } from 'react'
import { Container, Typography, CircularProgress, Box, Card, CardContent } from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent'
import api from '../../services/api'
import CardEvent from '../../components/CardEvent'
import ModalCreateEvento from '../../components/ModalCreateEvent'
import { ContainerDashboard } from './styles'
import ResponsiveAppBar from '../../components/AppBar'
import { useEvent } from '../../Providers/EventContext'

interface Event {
  id: number
  nome: string
  descricao: string
  dataEvento: string
  horaMontagem: string
  horaPassagemSom: string
  horaShow: string
  statusEvento: string
  valor: string
  contratante: {
    id: number
    name: string
    address: string
    phone: string
    description: string
    logoUrl: string
  }
}

const Dashboard: React.FC = () => {
  const { events, loading, error } = useEvent()

  return (
    <ContainerDashboard>
      <div className={'wrapper-container-header'}>
        <ResponsiveAppBar />
      </div>
      <div className={'wrapper-container'}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.1,
              },
            }}
          >
            {events.map(event => (
              <TimelineItem key={event.id}>
                <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                  {new Date(event.dataEvento).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' })}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <CardEvent event={event} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </div>
    </ContainerDashboard>
  )
}

export default Dashboard
