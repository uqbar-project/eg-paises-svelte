<script lang="ts">
	let { data } = $props()

	console.info(data)
</script>

<div>{data.pais.nombre}</div>