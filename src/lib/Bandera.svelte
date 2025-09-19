<script lang='ts'>
  let { bandera }: { bandera: string } = $props()
</script>
<style>
.bandera {
  width: 50px;
  height: auto;
  margin: 0 0 10px 0;
}
</style>
<div>
  <img class='bandera' alt='bandera' src={bandera}/>
</div>