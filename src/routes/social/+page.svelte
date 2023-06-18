<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let categories = ['ere'];
  let stocks = ["ere"];
  let printedStocks = ["oui"];

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:8000/allcategories');
      const data = await response.json();
      categories = data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    try {
      const response = await fetch('http://localhost:8000/allstock');
      stocks = await response.json();
      //Keep only the 2 first stocks
      printedStocks = stocks.slice(0, 2);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  });
</script>

<BaseLayout>
  Stock <br>
  <div id="list-stock">
    {#each printedStocks as stock}
    {#if stock.id == 1}
    <div id="stock-item1"><a id="cat-link" href="/stock/?q={stock.id}">{stock.name}</a></div>
    {:else}
      <div id="stock-item"><a id="cat-link" href="/stock/?q={stock.id}">{stock.name}</a></div>
    {/if}
    {/each}
    <div id="stock-itemA"><a id="cat-link" href="/stocks"><i class="fa-solid fa-arrow-right"></i></a></div>
    
  </div>
  Categories <br>
  <div id="cat-container">
    {#each categories as item}
      <div id="cat"><a id="cat-link" href="/category/?q={item.id}">{item.name}</a></div>
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
