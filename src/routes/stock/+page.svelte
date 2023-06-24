<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';

  let categories = [];
  let stocks = [];
  let printedStocks = [];
  let listofStocks = [];
  let display_arrow = true;
  let id = Cookies.get('id');
  let stockchosen = { id: 1, name: 'Frigo' };

  let access_token = Cookies.get('access_token');
  let refresh_token = Cookies.get('refresh_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  async function fetchCategoriesForStock(stockId) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_categories_for_stock/${stockId}/`, {
        headers: headers
      });
      const data = await response.json();
      categories = data.categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function gotoStock1() {
    display_arrow = true;
    listofStocks = [];
    stockchosen = printedStocks[0];
    await fetchCategoriesForStock(stockchosen.id);
  }

  async function gotoStock2() {
    display_arrow = true;
    listofStocks = [];
    stockchosen = printedStocks[1];
    await fetchCategoriesForStock(stockchosen.id);
  }

  async function otherStocks() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`, {
        headers: headers
      });
      stocks = await response.json();
      listofStocks = stocks.stocks.slice(2);
      categories = [];
      display_arrow = false;
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  }

  async function gotoStockChosen(stock) {
    display_arrow = false;
    listofStocks = [];
    stockchosen = stock;
    printedStocks = [stock];
    await fetchCategoriesForStock(stockchosen.id);
  }

  onMount(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`, {
        headers: headers
      });
      const data = await response.json();
      stocks = data.stocks;
      printedStocks = stocks.slice(0, 2);
      await fetchCategoriesForStock(printedStocks[0].id);

      try {
        const response = await fetch(`http://127.0.0.1:8000/get_categories_for_stock/${printedStocks[0].id}/`, {
          headers: headers
        });
        const data = await response.json();
        categories = data.categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  });
</script>

<BaseLayout>
  <div id="list-stock">
    {#if printedStocks.length > 0}
    <div class="stock-item {stockchosen.id === printedStocks[0].id ? 'selected-stock' : ''}">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a id="cat-link" on:click={gotoStock1}>{printedStocks[0].name}</a></div>
    {/if}
    {#if printedStocks.length > 1}
        <div class="stock-item {stockchosen.id === printedStocks[1].id ? 'selected-stock' : ''}">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a id="cat-link" on:click={gotoStock2}>{printedStocks[1].name}</a></div>
    {/if}
    {#if display_arrow}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="stock-itemA"><a id="cat-link" on:click={otherStocks}><i class="fa-solid fa-arrow-right"></i></a></div>
    {/if}
  </div>
  {#if categories.length > 0}
  <br>Categories <br>
  <div id="cat-container">
    {#each categories as item}
      <a id="cat-link" href="/category/?q={item.id}&stock_id={stockchosen.id}"><div id="cat">{item.name}</div></a>
    {/each}
  </div>
  {/if}
  {#if listofStocks.length > 0}
  <div id="list-stock-2" class="unwrapped">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#each listofStocks as stock}
      <div class="stock-item"><a id="cat-link" on:click={()=>gotoStockChosen(stock)}>{stock.name}</a></div>
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
    word-wrap: break-word;
  }

  .stock-itemA{
    text-align: left;
  }

  .selected-stock {
    box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  }

</style>
