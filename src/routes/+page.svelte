<script lang="ts">
	import { Pais } from '../lib/pais'
	import { paisService } from '../lib/paisService'

	let paisBusqueda = $state('')
	let paises = $state<Pais[]>([])

	const buscar = async () => {
		paises = await paisService.buscarPais(paisBusqueda)
	}
</script>

<h2>Países</h2>
<input bind:value={paisBusqueda} />
<button onclick={buscar}>Buscar</button>
<ul>
	{#each paises as pais}
		<li>{pais.nombre}</li>
	{/each}
</ul>
