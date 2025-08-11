<script lang="ts">
  import './pais.css'
  import { formatearEntero } from '$lib/utils'
  import { goto } from '$app/navigation'
  import Bandera from '$lib/Bandera.svelte'

  let { data } = $props()
  const { pais } = data
  const volver = () => {
    goto('/')
  }
</script>

<div class="pais_page">
  <div class="titulo">
    <Bandera bandera={pais.bandera} />
    <h2>{pais.nombre}</h2>
  </div>
  <div class="pais_single">
    <div><span>Capital: </span>{pais.capital}</div>
    <div><span>Moneda:</span>{pais.moneda}</div>
    <div>
      <span>Superficie:</span>{formatearEntero(pais.area)} km<sup>2</sup>
    </div>
    <div class="poblacion">
      <span>Población:</span>{formatearEntero(pais.poblacion)}
      {#if pais.superpoblado}
        <img
          alt="está superpoblado"
          title="está superpoblado"
          src="/crowd.png"
          class="superpoblado"
        />
      {/if}
    </div>
    <div><span>Código de país:</span>{pais.codigo}</div>
    <div title={pais.timezone}><span>Qué hora es:</span>{pais.queHoraEs}</div>
  </div>
  <button data-testid="volver" class="botonera" onclick={volver}>Volver</button>
</div>
