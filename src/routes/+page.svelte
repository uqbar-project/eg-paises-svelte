<script lang="ts">
  import './paises.css'
  import { goto } from '$app/navigation'
  import { Pais } from '../lib/pais'
  import { paisService } from '../lib/paisService'
  import Bandera from '$lib/Bandera.svelte'
  import { getErrorMessage } from '$lib/utils'
  import { fade } from 'svelte/transition'

  let paisBusqueda = $state('')
  let errorMessage = $state('')
  let busquedaAutomatica = $state(false)
  let paises = $state<Pais[]>([])
  let buscarHabilitado = $derived(paisBusqueda.trim() !== '')

  const buscar = async () => {
    try {
      paises = await paisService.buscarPais(paisBusqueda)
    } catch (error: unknown) {
      errorMessage = getErrorMessage(error)
      setTimeout(() => { errorMessage = ''}, 5000)
    }
  }

  const handleKeyDownBuscar = async (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      await buscar()
    }
  }

  let timeout: ReturnType<typeof setTimeout>

  const debounce = (callback: (...args: unknown[]) => void, wait: number) => {
    return (...args: unknown[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        callback(...args)
      }, wait)
    }
  }

  const handleKeyUpBuscar = async () => {
    if (busquedaAutomatica && buscarHabilitado) {
      debounce(buscar, 1000)()
    }
  }
</script>

<div class="titulo">
  <h2>Países</h2>
</div>
<div class="busqueda">
  <input
    data-testid="paisBusqueda"
    onkeydown={handleKeyDownBuscar}
    onkeyup={handleKeyUpBuscar}
    bind:value={paisBusqueda}
    placeholder="Ingrese un valor para buscar países"
  />
  {#if !busquedaAutomatica}
    <button data-testid="buscar" onclick={buscar} disabled={!buscarHabilitado}>Buscar</button>
  {/if}
</div>
<div class="check">
  <input
    class="checkbox"
    type="checkbox"
    name="busquedaAutomatica"
    data-testid="busquedaAutomatica"
    bind:checked={busquedaAutomatica}
  />
  <label for="busquedaAutomatica">Buscar automáticamente</label>
</div>
<div class="paises">
  {#each paises as pais (pais.codigo)}
    <button
      class="pais"
      data-testid={`pais-${pais.codigo}`}
      onclick={() => goto(`/pais/${pais.codigo}`)}
    >
      <Bandera bandera={pais.bandera} />
      <div class="nombre_pais">{pais.nombre}</div>
    </button>
  {/each}
</div>
{#if errorMessage}
  <div class="error-message" transition:fade>{errorMessage}</div>
{/if}
