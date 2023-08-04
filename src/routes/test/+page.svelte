<script lang="ts">
    import Snackbar from "../../lib/Snackbar.svelte";
  
    let showMessage = false;
  
    function showSnackbar() {
      showMessage = true;
    }
</script>
  
  <style>
    button {
      margin: 20px;
    }
  </style>
  
  <button on:click={showSnackbar}>Show Snackbar</button>
  
  {#if showMessage}
    <Snackbar message="This is a snackbar message!" duration={5000} />
  {/if}
  