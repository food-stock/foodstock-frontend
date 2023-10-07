<!-- App.svelte -->
<script lang="ts">
  import DialogInput from "$lib/interactions/DialogInput.svelte";

  let input:string;
  let show:boolean;

  function handleAccept() {
    console.log(input);
  }

  function handleRefuse() {
    // Handle refuse logic here
  }
</script>

<main>
  <button on:click={() => show = true}>Show Dialog</button>
  <DialogInput
    title="Test"
    content="Test"
    acceptLabel="Test"
    refuseLabel="Test"
    onAccept={handleAccept}
    onRefuse={handleRefuse}
    bind:input
    bind:show
  />
</main>
