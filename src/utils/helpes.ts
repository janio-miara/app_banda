import dayjs from 'dayjs'

const formatHora = (dataHora: string): string => {
  const date = new Date(dataHora)
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatDayjs = (dayjsObject: any): string => {
  return dayjs(dayjsObject).format('YYYY-MM-DDTHH:mm:ss')
}

const formatDayjsHora = (dayjsObject: any): string => {
  return dayjs(dayjsObject).format('YYYY-MM-DDTHH:mm')
}

const formatCurrency = (value: string) => {
  const numericValue = parseFloat(value.replace(/\D/g, '')) / 100
  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

/**
 * Converte um valor monetário formatado em string (ex: "R$ 1.234,56") para um número float.
 * @param valor - O valor monetário em formato de string.
 * @returns O valor como um número float.
 */
function parseCurrency(valor: string): number {
  return parseFloat(valor.replace(/[R$.,]/g, '')) / 100
}
export { formatHora, formatDayjs, formatDayjsHora, formatCurrency, parseCurrency }
