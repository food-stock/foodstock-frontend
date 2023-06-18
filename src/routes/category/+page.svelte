<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let Entities = ["ere"];

  onMount(async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/allentities');
      const data = await response.json();
      console.log(data);
      Entities = data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
</script>

<BaseLayout>
  Entities <br>
  <div id="cat-container">
    {#each Entities as item}
      <div id="cat"><a id="cat-link" href="/category/?q={item.id}">{item.name}</a>{item}{item.entity}</div>
    {/each}
  </div>
</BaseLayout>

<style>
  #cat-container {
    width: 100vw;
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;
  }

  #cat {
    background-color: grey;
    color: white;
    border-radius: 10px;
    width: 40vw;
    height: 38vw;
    text-align: center;
    font-size: 26px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
  }

  #cat-link {
    text-decoration: none;
    color: white;
  }

  #list-stock{
    font-size: 26px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
    padding: 10px;
    display: inline-flex;
  }

  #stock-item, #stock-item1, #stock-itemA{
    background-color: aqua;
    width: 30vw;
    height: 10vw;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
  }

  #stock-item1{
    box-shadow : 0 0 10px black;
  }

  #stock-itemA{
    text-align: left;
  }
</style>
