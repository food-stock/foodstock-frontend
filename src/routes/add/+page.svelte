<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import { debounce } from 'lodash-es';
  import { _} from 'svelte-i18n';
  import { goto } from '$app/navigation'; 

  let access_token = Cookies.get('access_token');
  let refresh_token = Cookies.get('refresh_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  let defaultStock = {
    id: 1,
    name: 'Frigo',
  };
  let id = Cookies.get('id');
  let inputneeded = true;
  let defaultstock = true;  
  let optionchosen;
  let stockchosen;
  let quantity;
  let date_of_consumption;
  let inputstockneeded = true;


  let searchInput = '';
  let options = [];

  let stockSearchInput = '';
  let stockOptions = [];

  const fetchData = debounce(async () => {
    if (searchInput.length > 2) {
      const response = await fetch(`http://127.0.0.1:8000/search/${searchInput}/`, {
      headers: headers
    });
      const data = await response.json();
      options = data.food;
    } else {
      options = [];
    }
  }, 300);

  async function validateAdd() {
    try {
      const food_id = optionchosen.id;
      const stock_id = stockchosen.id;
      const quantitys = quantity;
      const date_of_consumptionl = date_of_consumption;
      const response = await fetch(`http://127.0.0.1:8000/create_entity/${stock_id}/${food_id}/${quantitys}/${date_of_consumptionl}/`, {
      headers: headers,
      method: 'POST'
    });
    goto('/stock');
    }
    catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  function gotoStock1() {
    stockchosen = printedStocks[0];
    inputstockneeded = false;
    defaultstock = true;
  }

  function gotoStock2() {
    stockchosen = printedStocks[1];
    inputstockneeded = false;
    defaultstock = true;
  }

  let stocks = [];
  let printedStocks = [];

  async function toogleDefaultStock() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`, {
      headers: headers
    });
      stocks = await response.json();
      //Keep only the 2 first stocks
      if (stocks.stocks.length > 2) {
        printedStocks = stocks.stocks.slice(0, 2);
      } else {
        printedStocks = stocks.stocks;
      }
      defaultstock = !defaultstock;
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  }

  function handleInput(event) {
    searchInput = event.target.value;
    fetchData();
  }

  function selectOption(option) {
    inputneeded = false;
    optionchosen = option;
  }

  const fetchStockData = debounce(async () => {
    const response = await fetch(`http://127.0.0.1:8000/search_stocks_with_access/${stockSearchInput}/${id}/`, {
      headers: headers
    });
    const data = await response.json();
    stockOptions = data.stocks;
  }, 300);

  function handleStockInput(event) {
    stockSearchInput = event.target.value;
    fetchStockData();
  }

  function selectStockOption(stock) {
    inputstockneeded = false;
    toogleDefaultStock();
    stockchosen = stock;
  }

  onMount(() => {
    stockchosen = defaultStock;
  });
</script>

<BaseLayout>
  <div id="container">
    {#if inputneeded}
    {#if options.length === 0}
    {$_('Add.TypeName')}
    {:else}
    {$_('Search.HaveToChoose')}
    <ul>
      {#each options as option}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => selectOption(option)}>{option.name}</li>
      {/each}
    </ul>
    {/if}
    <input id="input" type="text" bind:value={searchInput} on:input={handleInput} />
    {:else}
    {$_('Add.YouChose')}
        <div id="btn">{optionchosen.name}</div>

        {#if !defaultstock}
        {$_('Add.SearchAStock')}
          {#if printedStocks.length > 0}
          <div id="list-stock">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a id="cat-link" on:click={gotoStock1}>{printedStocks[0].name}</a>
          {#if printedStocks.length > 1}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a id="cat-link" on:click={gotoStock2}>{printedStocks[1].name}</a>
          {/if}
          </div>
          {/if}
          {$_('Add.OrOthers')}<br>
          <input type="text" bind:value={stockSearchInput} on:input={handleStockInput} />
          {#if stockOptions.length > 0}
            <ul>
              {#each stockOptions as stock}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li on:click={() => selectStockOption(stock)}>{stock.name}</li>
              {/each}
            </ul>
          {/if}
        {:else}
        {$_('Add.WillBeAdded')} : <p on:click={toogleDefaultStock}>non ?</p> 
        <div id="btn">{stockchosen.name}</div>
        {/if}

        {$_('Add.HowMany')}
        <input id="input" type="number" bind:value={quantity}/>
        {$_('Add.CDate')}
        <input id="input" type="date" bind:value={date_of_consumption} />
        <div id="validation">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
         <div id="bttonY" on:click={validateAdd}><i class="fa-solid fa-check"></i></div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a id="link" href="/stock"><div id="bttonN"><i class="fa-solid fa-xmark"></i></div></a>
       </div>

    {/if}

  </div>
</BaseLayout>

<style>
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  #validation {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  #bttonY,
  #bttonN {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    margin-right: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li , #btn, #cat-link {
    cursor: pointer;
    padding: 10px;
    border-radius: 15px;
    background-color: beige;
  }

  #input {
    margin: 10px;
    margin-top: 20px;
    padding: 10px;
    border-radius: 15px;
  }

  #link {
    text-decoration: none;
    color : black;
  }

 p {
  background-color: aqua;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  border-radius: 15px;
 }

 #cat-link {
    text-decoration: none;
    margin-left: 10px;
    margin-right: 10px;
  }

  #list-stock{
    margin: 10px;
    padding: 10px;
    display: inline-flex;
  }
</style>
