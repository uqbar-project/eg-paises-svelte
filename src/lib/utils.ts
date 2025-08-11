import { AxiosError } from 'axios'

export const formatearEntero = (numero: number) =>
  new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(numero)

export const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    // eslint-disable-next-line no-console
    console.error(error)
    if ((error.status ?? 0) >= 500) {
      return 'Ocurrió un error, consulte al administrador del sistema'
    }
    if (error.status === 404) {
      return 'No se encontró el enlace al origen de datos'
    }
    return error.message
  }
  return (error as Error).message
}
