<script lang='ts'>
	import './paises.css'
	import { goto } from '$app/navigation'
	import { Pais } from '../lib/pais'
	import { paisService } from '../lib/paisService'
  import Bandera from '$lib/Bandera.svelte'

	let paisBusqueda = $state('')
	let paises = $state<Pais[]>([])
	let buscarHabilitado = $derived(paisBusqueda.trim() !== '')

	const buscar = async () => {
	  paises = await paisService.buscarPais(paisBusqueda)
	}

	const handleKeydown = async (event: { keyCode: number }) => {
	  if (event.keyCode === 13) {
	    await buscar()
	  }
	}
</script>

<div class='titulo'>
	<h2>Países</h2>
</div>
<div class='busqueda'>
	<input
		data-testid='paisBusqueda'
		onkeydown={handleKeydown}
		bind:value={paisBusqueda}
		placeholder='Ingrese un valor para buscar países'
	/>
	<button data-testid='buscar' onclick={buscar} disabled={!buscarHabilitado}>Buscar</button>
</div>
<div class='paises'>
	{#each paises as pais, indice}
		<button
			class='pais'
			data-testid={`pais-${indice}`}
			onclick={() => goto(`/pais/${pais.codigo}`)}
		>
			<Bandera bandera={pais.bandera}/>
			<div class='nombre_pais'>{pais.nombre}</div>
		</button>
	{/each}
</div>
