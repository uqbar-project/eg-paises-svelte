import axios from 'axios'
import { Pais } from './pais'

import { PUBLIC_API_BASE_URL, PUBLIC_API_VERSION } from '$env/static/public'

class PaisService {
  async buscarPais(paisBusqueda: string): Promise<Pais[]> {
    const response = await axios.get(`${PUBLIC_API_BASE_URL}/${PUBLIC_API_VERSION}/name/${paisBusqueda}`)
    return response.data.map(toPais)
  }

  async datosDePais(codigoDePais: string): Promise<Pais> {
    const response = await axios.get(`${PUBLIC_API_BASE_URL}/${PUBLIC_API_VERSION}/alpha/${codigoDePais}`)
    return toPais(response.data[0])
  }
}

const toPais = ({
  flags,
  name,
  translations,
  currencies,
  cioc,
  ccn3,
  population,
  area,
  capital,
  timezones
}: {
  flags: { svg: string },
  name: { common: string }
  translations: { [key: string]: { common: string } }
  currencies: { [key: string]: { name: string; symbol: string } }
  cioc: string
  ccn3: string
  population: number
  area: number
  capital: string
  timezones: string[]
}): Pais => {
  const keysCurrencies = Object.keys(currencies ?? {})
  const countryName = translations['spa']?.common ?? name?.common
  const currency = keysCurrencies?.length ? currencies[keysCurrencies[0]].name : ''
  const pais = new Pais(
    countryName,
    flags.svg,
    currency,
    cioc ?? ccn3,
    population,
    area,
    capital,
    timezones[0]
  )
  return pais
}

export const paisService = new PaisService()
