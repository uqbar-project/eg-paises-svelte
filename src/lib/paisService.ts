import axios from 'axios'
import { Pais } from './pais'

const BASE_URL = 'https://restcountries.com'
const VERSION = 'v3.1'

class PaisService {
	async buscarPais(paisBusqueda: string): Promise<Pais[]> {
		const response = await axios.get(`${BASE_URL}/${VERSION}/name/${paisBusqueda}`)
		return response.data.map(toPais)
	}

	async datosDePais(codigoDePais: string): Promise<Pais> {
		const response = await axios.get(`${BASE_URL}/${VERSION}/alpha/${codigoDePais}`)
		return toPais(response.data[0])
	}
}

const toPais = ({
	flag,
	name,
	currencies,
	cioc
}: {
	flag: string
	name: { common: string }
	currencies: object[]
	cioc: string
}): Pais => {
	const currency = currencies?.length ? Object.keys(currencies)[0] : ''
	return new Pais(name?.common, flag, currency, cioc)
}

export const paisService = new PaisService()
