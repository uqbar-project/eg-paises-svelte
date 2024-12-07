<script lang="ts">
	import { goto } from '$app/navigation'
	import './pais.css'
	let { data } = $props()
	const { pais } = data
	const formatearNumero = (numero: number) =>
	  new Intl.NumberFormat('es-AR', {minimumFractionDigits: 0}).format(numero)
	const volver = () => { goto('/') }
</script>

<div>
	<div class='pais_titulo'>
		<h2>{pais.nombre}</h2>
		<div class='bandera_single'>{pais.bandera}</div>
	</div>
	<hr/>
	<div class='pais_single'>
		<div><span>Moneda:</span>{pais.moneda}</div>
		<div><span>Capital: </span>{pais.capital}</div>
		<div><span>Area:</span>{formatearNumero(pais.area)}</div>
		<div class='poblacion'>
			<span>Población:</span>{formatearNumero(pais.poblacion)}
			{#if pais.superpoblado()}
				<img alt='está superpoblado' title='está superpoblado' src='/crowd.png' class='superpoblado'/>
			{/if}
		</div>
		<div><span>Código:</span>{pais.codigo}</div>
		<div><span>Qué hora es:</span>{pais.queHoraEs()}</div>
	</div>
	<button onclick={volver}>Volver</button>
</div>