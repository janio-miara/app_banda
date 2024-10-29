import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Button, Modal, Paragraph } from 'w-design-system'
import './calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

// Configurar o localizador do Moment.js
moment.locale('pt-br')
const localizer = momentLocalizer(moment)

const DnDCalendar = withDragAndDrop(Calendar)

// Definir os usuários (recursos) com fotos e backgrounds
const resources = [
  { id: 1, title: 'Day', photo: 'https://via.placeholder.com/50', backgroundColor: '#ff548f' },
  { id: 2, title: 'Francisco', photo: 'https://via.placeholder.com/50', backgroundColor: '#9061c2' },
  { id: 3, title: 'Sheila', photo: 'https://via.placeholder.com/50', backgroundColor: '#63d3ff' },
  { id: 4, title: 'Usuário 3', photo: 'https://via.placeholder.com/50', backgroundColor: '#02779e' },
  { id: 5, title: 'Usuário 4', photo: 'https://via.placeholder.com/50', backgroundColor: '#be80ff' },
]

const today = new Date()
const startD = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0)
const endD = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0)

// Definir os eventos, associando cada evento a um usuário
const initialEvents = [
  {
    id: 0,
    title: 'Evento Usuário 1',
    start: startD,
    end: endD,
    resourceId: 1,
  },
  {
    id: 1,
    title: 'Evento Usuário 2',
    start: startD,
    end: endD,
    resourceId: 2,
  },
]

const MyResourceCalendar: React.FC = () => {
  const [events, setEvents] = useState(initialEvents)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  // Abrir modal ao clicar em um evento existente
  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event)
    setTitle(event.title)
    setStartTime(moment(event.start).format('HH:mm'))
    setEndTime(moment(event.end).format('HH:mm'))
    setIsModalOpen(true)
  }

  // Abrir modal ao clicar em um horário vazio (slot)
  const handleSelectSlot = (slotInfo: any) => {
    setSelectedEvent(null) // Limpa o evento selecionado
    setTitle('') // Título vazio para um novo evento
    setStartTime(moment(slotInfo.start).format('HH:mm'))
    setEndTime(moment(slotInfo.end).format('HH:mm'))
    setIsModalOpen(true)
  }

  // Salvar novo evento ou atualizar evento existente
  const handleSave = () => {
    if (selectedEvent) {
      // Atualizar evento existente
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id
          ? {
              ...event,
              title,
              start: moment(
                `${moment(selectedEvent.start).format('YYYY-MM-DD')} ${startTime}`,
                'YYYY-MM-DD HH:mm'
              ).toDate(),
              end: moment(`${moment(selectedEvent.end).format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate(),
            }
          : event
      )
      setEvents(updatedEvents)
    } else {
      // Criar novo evento
      const newEvent = {
        id: events.length + 1,
        title,
        start: moment(`${moment().format('YYYY-MM-DD')} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate(),
        end: moment(`${moment().format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate(),
        resourceId: 1, // Por padrão, associa ao primeiro recurso
      }
      setEvents([...events, newEvent])
    }
    setIsModalOpen(false)
  }

  const onEventResize = (data: any) => {
    const { start, end } = data
    setEvents(prevEvents => prevEvents.map(event => (event.id === data.event.id ? { ...event, start, end } : event)))
  }

  const onEventDrop = (data: any) => {
    const { start, end } = data
    setEvents(prevEvents => prevEvents.map(event => (event.id === data.event.id ? { ...event, start, end } : event)))
  }

  return (
    <div style={{ height: '700px', padding: '20px' }}>
      {isModalOpen && (
        <Modal
          title={selectedEvent ? 'Editar Evento' : 'Criar Evento'}
          onClose={() => setIsModalOpen(false)}
          footer={
            <>
              <Button onClick={() => setIsModalOpen(false)} variant="gray">
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </>
          }
        >
          <Paragraph size="medium">
            {selectedEvent ? 'Editar os detalhes do evento:' : 'Criar um novo evento:'}
          </Paragraph>
          <div>
            <div>Título:</div>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <div>Início:</div>
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
          <div>
            <div>Fim:</div>
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>
        </Modal>
      )}

      <DnDCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView="day"
        views={['day']}
        step={30}
        timeslots={1}
        min={new Date(2024, 9, 20, 9, 0, 0)}
        max={new Date(2024, 9, 20, 22, 0, 0)}
        resources={resources}
        resourceIdAccessor="id"
        resourceTitleAccessor={(resource: any) => (
          <div
            style={{
              backgroundColor: resource.backgroundColor,
              padding: '16px',
              height: '100%',
              borderRadius: '16px 16px 0 0 ',
            }}
          >
            {resource.title}
          </div>
        )}
        resizable
        onEventResize={onEventResize}
        onEventDrop={onEventDrop}
        onSelectSlot={handleSelectSlot} // Abre o modal ao clicar em um horário vazio
        onSelectEvent={handleSelectEvent} // Abre o modal ao clicar em um evento existente
        draggableAccessor={() => true}
        style={{ height: '100%' }}
      />
    </div>
  )
}

export default MyResourceCalendar
