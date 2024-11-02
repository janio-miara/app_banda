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
import { useEvent } from '../../Providers/EventContext'
import BottomMenu from "../../components/MenuSiBar/BottomMenu";
import ResponsiveAppBar from "../../components/AppBar";

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
          <div>
            {events.map((event:any) => (
                <CardEvent event={event} />
            ))}
          </div>
        )}
      </div>
      <div className={'footer'}>
        <BottomMenu />
      </div>

    </ContainerDashboard>
  )
}

export default Dashboard
