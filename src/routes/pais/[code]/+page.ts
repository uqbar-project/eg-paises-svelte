import { paisService } from '$lib/paisService'

export async function load({ params }) {
	const pais = await paisService.datosDePais(params.code)
	return { pais }
}
