<script lang="ts">
export let stockchosen : any;
import { onMount, afterUpdate } from 'svelte';
import headers from '$lib/requests/headers';
import { translate } from '../../TranslationStore';

let categories:any[] = [];
let currentStock = stockchosen;

async function fetchCategoriesForStock(stockId:string) {
  try {
    const response = await fetch(`http://localhost:8000/get_categories_for_stock/${stockId}/`, {
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
      <a id="cat-link" href="/category/?q={item.id}&stock_id={stockchosen}"><div id="cat">{item.name}</div></a>
    {/each}
  </div>
{:else}
  <div class="nothing">{translate('Stock.NoItem')}</div>
  <a id="add" href="/add">{translate('Stock.AddProduct')}</a>
{/if}

<style>
    .nothing {
        text-align: center;
        font-size: 1.3rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }
</style>