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
	cioc,
	population,
	area,
	capital,
	timezones,
}: {
	flag: string
	name: { common: string }
	currencies: { [key: string]: { name: string; symbol: string } },
	cioc: string,
	population: number,
	area: number,
	capital: string,
	timezones: string[],
}): Pais => {
	const keysCurrencies = Object.keys(currencies ?? {})
	const currency = keysCurrencies?.length ? currencies[keysCurrencies[0]].name : ''
	const pais = new Pais(name?.common, flag, currency, cioc, population, area, capital, timezones[0])
	return pais
}

export const paisService = new PaisService()
