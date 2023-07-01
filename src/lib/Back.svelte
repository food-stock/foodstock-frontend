<script>
    import {goto} from '$app/navigation';

    export let name;
</script>

<button class="blue-item">
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
  </style>
  