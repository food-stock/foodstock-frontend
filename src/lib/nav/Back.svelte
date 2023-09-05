<script lang="ts">
    export let name:string;
    export let link:string;

    import { goto } from '$app/navigation';
</script>

<button class="blue-item" on:click={()=>goto(link)}>
    {name}
</button>
  
<style>
    .blue-item {
      background-color: var(--blue-color);
      width: 30vw;
      height: 10vw;
      margin: 10px;
      padding: 10px;
      border-radius: 20px;
      cursor: pointer;
      text-align: center;
      word-wrap: break-word;
    }

    @media (max-width: 600px) {
        .blue-item {
            width: 90vw;
            height: 20vw;
        }
    }

    :global(body.dark-mode) .blue-item {
        background-color: var(--blue-color);
        color: var(--black-color);
    }
</style>
  