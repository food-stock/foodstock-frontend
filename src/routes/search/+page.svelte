<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import BaseLayout from '../BaseLayout.svelte';
  import Cookies from 'js-cookie';
  import { debounce } from 'lodash-es';

  let access_token = Cookies.get('access_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  let id = Cookies.get('id');

  let searchInput = '';
  let stockOptions = [];
  let options = [];

  const fetchData = debounce(async () => {
    if (searchInput.length > 1) {
      const response = await fetch(`http://127.0.0.1:8000/search_product_among_stocks/${searchInput}/${id}/`, {
      headers: headers
    });
      const data = await response.json();
      options = data.entities;
    } else {
      options = [];
    }
  }, 300);

  function handleInput(event) {
    searchInput = event.target.value;
    fetchData();
  }


    function selectStockOption(stock: any): any {
        throw new Error('Function not implemented.');
    }
</script>

<BaseLayout>
  <div id="container">
      {#if options.length === 0}
      {translate('Search.Title')}
      {:else}
      {translate('Search.HaveToChoose')}
        <ul>
          <div id="cat-container">
          {#each options as option}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a id="cat-link" href="/product?food_id={option.food__id}">
              <li>
                <img id="picture" alt="Product" src="{option.food__picture}">
                <div id="cat">{option.food__name}</div>
              </li>
            </a>
          {/each}
        </div>
        </ul>
      {/if}
      {#if stockOptions.length > 0}
        <ul>
            {#each stockOptions as stock}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                  <li on:click={() => selectStockOption(stock)}>{stock.name}</li>
            {/each}
        </ul>
      {/if}
      <input id="input" type="text" bind:value={searchInput} on:input={handleInput} />
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

  #cat-container {
    width: 100vw;
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li , #cat-link {
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
    border: 1px solid global(--grey-color);
  }

 #cat-link {
    text-decoration: none;
    margin-left: 10px;
    margin-right: 10px;
    overflow: hidden;
    color : global(--dark-color);
    text-decoration: none;
  }
  
  #picture {
    width: auto;
    height: 100px;
    margin-right: 10px;
  }
</style>
