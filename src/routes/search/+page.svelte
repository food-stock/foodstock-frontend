<script lang='ts'>
  import { translate } from '$lib/locales/TranslationStore';
  import Cookies from 'js-cookie';import headers from '$lib/requests/headers';
import constants from '$lib/constants';
  import { debounce } from 'lodash-es';

  


  let id = Cookies.get('id');

  let searchInput = '';
  let stockOptions = [];
  let options = [];

  const fetchData = debounce(async () => {
    if (searchInput.length > 1) {
      const response = await fetch(`${constants.ADD_API}search_product_among_stocks/${searchInput}/${id}/`, {
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
      <input class="input" placeholder={translate("TypeHere")} id="input" type="text" bind:value={searchInput} on:input={handleInput} />
  </div>


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
    border: 1px solid var(--grey-color);
  }

  .input {
  font-family: monospace;
  max-width: 190px;
  outline: none;
  border: 1px solid #dadada;
  padding: 10px;
  border-radius: 5px;
  background-color: #f3f7fe;
  transition: .3s;
  color: #3b82f6;
}

.input:focus {
  border: 1px solid #3b82f6;
  box-shadow: 0 0 0 4px #3b83f65f
}

 #cat-link {
    text-decoration: none;
    margin-left: 10px;
    margin-right: 10px;
    overflow: hidden;
    color : var(--dark-color);
    text-decoration: none;
  }
  
  #picture {
    width: auto;
    height: 100px;
    margin-right: 10px;
  }
</style>
