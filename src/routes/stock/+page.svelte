<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';

  let categories = [];
  let stocks = [];
  let printedStocks = [];
  let listofStocks = [];
  let display_arrow = true;
  let selectedStockId = 1;
  let id = Cookies.get('id');

  async function gotoStock1() {
    display_arrow = true;
    listofStocks = [];
    selectedStockId = 1;
    try {
      const response = await fetch('http://127.0.0.1:8000/get_categories_for_stock/1');
      const data = await response.json();
      categories = data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function gotoStock2() {
    display_arrow = true;
    listofStocks = [];
    selectedStockId = 2;
    try {
      const response = await fetch('http://127.0.0.1:8000/get_categories_for_stock/2');
      const data = await response.json();
      categories = data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function otherStocks() {
    selectedStockId = 0;
    try {
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`);
      stocks = await response.json();
      console.log(stocks);
      listofStocks = stocks.stocks.slice(2);
      console.log(listofStocks);
      categories = [];
      display_arrow = false;
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  }

  onMount(async () => {
    //Fetch the stocks of the user
    try {
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`);
      stocks = await response.json();
      console.log(stocks);
      //Keep only the 2 first stocks
      printedStocks = stocks.stocks.slice(0, 2);
      console.log(printedStocks);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
    //Fetch the categories of the first stock
    try {
      const response = await fetch('http://127.0.0.1:8000/get_categories_for_stock/1');
      const data = await response.json();
      categories = data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
</script>

<BaseLayout>
  <div id="list-stock">
    {#if printedStocks.length > 0}
    <div class="stock-item {selectedStockId === printedStocks[0].id ? 'selected-stock' : ''}">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a id="cat-link" on:click={gotoStock1}>{printedStocks[0].name}</a></div>
    <div class="stock-item {selectedStockId === printedStocks[1].id ? 'selected-stock' : ''}">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a id="cat-link" on:click={gotoStock2}>{printedStocks[1].name}</a></div>
    {/if}
    {#if display_arrow}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="stock-itemA"><a id="cat-link" on:click={otherStocks}><i class="fa-solid fa-arrow-right"></i></a></div>
    {/if}
  </div>
  {#if categories.length > 0}
  Categories <br>
  <div id="cat-container">
    {#each categories as item}
      <a id="cat-link" href="/category/?q={item.id}"><div id="cat">{item.name}</div></a>
    {/each}
  </div>
  {/if}
  {#if listofStocks.length > 0}
  <div id="list-stock-2" class="unwrapped">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#each listofStocks as stock}
      <div class="stock-item"><a id="cat-link" on:click={gotoStock2}>{stock.name}</a></div>
    {/each}
  </div>
  {/if}
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
    color : white;
    border-radius: 10px;
    width: 40vw;
    height: 38vw;
    text-align: center;
    font-size: 26px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
    padding-top: 5px;
  }

  #cat-link {
    text-decoration: none;
    color: white;
  }

  #list-stock, #list-stock-2{
    font-size: 26px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
    padding: 10px;
    display: inline-flex;
  }

  #list-stock-2{
    flex-wrap: wrap ;
  }

  .stock-item, .stock-itemA{
    background-color: aqua;
    width: 30vw;
    height: 10vw;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
  }

  .stock-itemA{
    text-align: left;
  }

  .selected-stock {
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  }

</style>
