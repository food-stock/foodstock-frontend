<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import { debounce } from 'lodash-es';

  let defaultStock = {
    id: 1,
    name: 'Frigo',
  };
  let selectedStockId = 1;
  let id = Cookies.get('id');
  let inputneeded = true;
  let inputstockneeded = true;
  let defaultstock = true;  
  let optionchosen;
  let stockchosen;
  let quantity;
  let date_of_consumption;


  let searchInput = '';
  let options = [];

  let stockSearchInput = '';
  let stockOptions = [];

  const fetchData = debounce(async () => {
    if (searchInput.length > 3) {
      const response = await fetch(`http://127.0.0.1:8000/search/${searchInput}`);
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
      const response = await fetch(`http://127.0.0.1:8000/create_entity/${stock_id}/${food_id}/${quantitys}/${date_of_consumptionl}`);

      if (response.status === 200) {
        console.log('Entity created');
      } else {
        console.error('Error creating entity');
      }
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
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`);
      stocks = await response.json();
      //Keep only the 2 first stocks
      printedStocks = stocks.stocks.slice(0, 2);
      console.log(printedStocks);
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
    const response = await fetch(`http://127.0.0.1:8000/search_stocks_with_access/${stockSearchInput}/${id}`);
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
    Tapes le nom du produit :
    {:else}
    Plus qu'à choisir ...
    <ul>
      {#each options as option}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li on:click={() => selectOption(option)}>{option.name}</li>
      {/each}
    </ul>
    {/if}
    <input id="input" type="text" bind:value={searchInput} on:input={handleInput} />
    {:else}
        Tu as choisi :
        <div id="btn">{optionchosen.name}</div>

        {#if !defaultstock}
          Rechercher un stock :
          {#if printedStocks.length > 0}
          <div id="list-stock">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a id="cat-link" on:click={gotoStock1}>{printedStocks[0].name}</a>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a id="cat-link" on:click={gotoStock2}>{printedStocks[1].name}</a>
          </div>
          {/if}
          ou autres : <br>
          <input type="text" bind:value={stockSearchInput} on:input={handleStockInput} />
          {#if stockOptions.length > 0}
            <ul>
              {#each stockOptions as stock}
                <li on:click={() => selectStockOption(stock)}>{stock.name}</li>
              {/each}
            </ul>
          {/if}
        {:else}
        Sera ajouté à : <p on:click={toogleDefaultStock}>non ?</p> 
        <div id="btn">{stockchosen.name}</div>
        {/if}

        Combien ?
        <input id="input" type="number" bind:value={quantity}/>
        Date de péremption ?
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
