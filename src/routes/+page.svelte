<script lang="ts">
	import './paises.css'
	import { goto } from '$app/navigation'
	import { Pais } from '../lib/pais'
	import { paisService } from '../lib/paisService'

	let paisBusqueda = $state('')
	let paises = $state<Pais[]>([])
	let buscarHabilitado = $derived(paisBusqueda.trim() !== '')

	const buscar = async () => {
		paises = await paisService.buscarPais(paisBusqueda)
	}

	const handleKeydown = (event: { keyCode: number }) => {
		if (event.keyCode === 13) {
			buscar()
		}
	}
</script>

<div class="titulo">
	<h2>Países</h2>
</div>
<div class="busqueda">
	<input
		data-testid="paisBusqueda"
		onkeydown={handleKeydown}
		bind:value={paisBusqueda}
		placeholder="Ingrese un valor para buscar países"
	/>
	<button data-testid="buscar" onclick={buscar} disabled={!buscarHabilitado}>Buscar</button>
</div>
<div class="paises">
	{#each paises as pais, indice}
		<button
			class="pais"
			data-testid={`pais-${indice}`}
			onclick={() => goto(`/pais/${pais.codigo}`)}
		>
			<div class="bandera">{pais.bandera}</div>
			<div class="nombre_pais">{pais.nombre}</div>
		</button>
	{/each}
</div>
