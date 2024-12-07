import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"

export class Pais {
	constructor(
		public nombre: string,
		public bandera: string,
		public moneda: string,
		public codigo: string,
		public poblacion: number,
		public area: number,
		public capital: string,
		public timezone: string,
	) {}

	superpoblado() {
		return (this.poblacion / this.area) > 100
	}

	queHoraEs() {
		return format(toZonedTime(new Date(), this.timezone.slice(3)), 'HH:mm:ss')
	}
}
