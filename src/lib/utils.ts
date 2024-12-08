export const formatearEntero = (numero: number) =>
	new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0 }).format(numero)
