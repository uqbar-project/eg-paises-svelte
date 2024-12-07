import { paisService } from '$lib/paisService.js'

export async function load({ params }) {
	const pais = await paisService.datosDePais(params.code)
	return { pais }
}
