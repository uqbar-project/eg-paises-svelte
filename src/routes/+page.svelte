<script lang='ts'>
	import './paises.css'
	import { Pais } from '../lib/pais'
	import { paisService } from '../lib/paisService'
	import { goto } from '$app/navigation'

	let paisBusqueda = $state('')
	let paises = $state<Pais[]>([])

	const buscar = async () => {
		paises = await paisService.buscarPais(paisBusqueda)
	}
</script>

<h2>Países</h2>
<div class='busqueda'>
	<input bind:value={paisBusqueda} />
	<button onclick={buscar}>Buscar</button>
	</div>
<div class='paises'>
	{#each paises as pais}
		<button class='pais' onclick={() => goto(`/pais/${pais.codigo}`)}>
			<div>{pais.bandera}</div>
			<div class='nombre_pais'>{pais.nombre}</div>
		</button>
	{/each}
</div>