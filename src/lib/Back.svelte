<script>
    import {goto} from '$app/navigation';

    export let name;
    export let link;

    function goto2(link) {
        goto(link)
    }
</script>

<button class="blue-item" on:click={goto2}>
    {name}
</button>
  
  <style>
    .blue-item {
    background-color: aqua;
    width: 30vw;
    height: 10vw;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    word-wrap: break-word;
    }
  </style>
  