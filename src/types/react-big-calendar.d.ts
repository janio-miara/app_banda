declare module 'react-big-calendar' {
  import { ComponentType, CSSProperties } from 'react'
  import moment from 'moment'

  export interface CalendarProps<TEvent = object, TResource = object> {
    localizer: {
      format: (date: Date, format: string, culture?: string) => string
      parse: (value: string, format: string, culture?: string) => Date
      startOfWeek: (culture?: string) => Date
      getDay: (date: Date) => number
    }
    events: TEvent[]
    startAccessor?: string | ((event: TEvent) => Date)
    endAccessor?: string | ((event: TEvent) => Date)
    titleAccessor?: string | ((event: TEvent) => string)
    allDayAccessor?: string | ((event: TEvent) => boolean)
    resourceAccessor?: string | ((event: TEvent) => TResource)
    resourceIdAccessor?: string | ((resource: TResource) => any)
    resourceTitleAccessor?: string | ((resource: TResource) => any)
    defaultView?: 'month' | 'week' | 'work_week' | 'day' | 'agenda'
    views?: Array<'month' | 'week' | 'work_week' | 'day' | 'agenda'>
    step?: number
    timeslots?: number
    min?: Date
    max?: Date
    style?: CSSProperties
    [prop: string]: unknown
  }

  export const Calendar: ComponentType<CalendarProps>

  export function momentLocalizer(momentInstance: typeof moment): any
}
