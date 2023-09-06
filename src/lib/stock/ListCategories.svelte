<script lang="ts">
export let stockchosen : any;
import { onMount, afterUpdate } from 'svelte';
import headers from '$lib/requests/headers';
import constants from '$lib/constants';
import { translate } from '$lib/locales/TranslationStore';
import { goto } from '$app/navigation';

let categories:any[] = [];
let currentStock = stockchosen;

async function fetchCategoriesForStock(stockId:string) {
  try {
    const response = await fetch(`${constants.ADD_API}get_categories_for_stock/${stockId}/`, {
      headers: headers
    });
    const data = await response.json();
    categories = data.categories;
    stockchosen = stockId;
  } catch (error) {
    console.log(error);
  }
}

onMount(async () => {
    fetchCategoriesForStock(stockchosen);
});


afterUpdate(async () => {
    if (currentStock !== stockchosen){
        currentStock = stockchosen;
        fetchCategoriesForStock(stockchosen);
    }
});


</script>


<br>Categories <br>
{#if categories.length > 0}
  <!-- Add transition for categories -->
  <div id="cat-container" class="transition-slide">
    {#each categories as item}
      <button id="cat-link" on:click={()=>goto(`/category/?q=${item.id}&stock_id=${stockchosen}`)}>{item.name}</button>
    {/each}
  </div>
{:else}
  <div class="nothing">{translate('Stock.NoItem')}</div>
  <button id="add" on:click={()=>goto("/add")}>{translate('Stock.AddProduct')}</button>
{/if}

<style>
  .nothing {
    text-align: center;
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  button {
    border: none;
    background-color: var(--grey-color);
    border-radius: 10px;
    cursor: pointer;
    padding: 0;
    margin: 0;
    outline: none;
    border-radius: 10px;
    width: 200px;
    height: 110px;
    text-align: center;
    font-size: 26px;
    margin: 10px;
  }    

  #cat-container {
    width: 100vw;
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;
  }

  .transition-slide {
    transition: transform 0.2s ease;
  }

  #add {
    align-items: center;
    color: var(--black-color);
    text-decoration: none;
    font-size: 26px;
    width: 80vw;
    margin-left: 25px;
    margin-right: 10px;
  }

  
  @media (max-width: 600px) {
    .nothing {
      text-align: center;
      font-size: 1.3rem;
      margin-top: 1rem;
      margin-bottom: 2rem;
    }

    button {
      border: none;
      background-color: var(--grey-color);
      border-radius: 10px;
      cursor: pointer;
      padding: 0;
      margin: 0;
      outline: none;
      border-radius: 10px;
      width: 40vw;
      height: 20vw;
      text-align: center;
      font-size: 26px;
      margin: 10px;
    }    

    #cat-container {
      width: 100vw;
      margin: 10px;
      display: inline-flex;
      flex-wrap: wrap;
    }

    .transition-slide {
      transition: transform 0.2s ease;
    }

    #add {
      align-items: center;
      color: var(--black-color);
      text-decoration: none;
      font-size: 26px;
      width: 80vw;
      margin-left: 25px;
      margin-right: 10px;
    }
  }

  :global(body.dark-mode) .nothing {
    color: var(--white-color);
  }

  :global(body.dark-mode) button {
    color: var(--black-color);
    background-color: var(--grey-color);
  }

  :global(body.dark-mode) #cat-container {
    color: var(--black-color);
  }

  :global(body.dark-mode) #add {
    color: var(--black-color);
  }
</style>