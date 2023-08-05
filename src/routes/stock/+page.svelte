<script lang='ts'>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import { goto } from '$app/navigation';
  import { translate } from '../../TranslationStore';
  import Loading from '../../lib/Loading.svelte';

  let categories = [];
  let stocks = [];
  let stockchosen;
  let loading = true;
  let loadingCategories = true;
  let selectedStock = null;

  const access_token = Cookies.get('access_token');
  const id = Cookies.get('id');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  async function refreshToken() {
    const refresh_token = Cookies.get('refresh_token');
    const header = {
      'Content-Type': 'application/json'
    }
    const formData = new URLSearchParams();
    formData.append('refresh', refresh_token);
    const response = await fetch('http://localhost:8000/token/refresh/', {
      method: 'POST',
      headers: header,
      body: formData
    });

    if (response.status === 401) {
      // If the token refresh fails (401 Unauthorized), redirect to login
      goto('/login');
      return;
    }

    const data = await response.json();
    Cookies.set('access_token', data.access);
  }

  async function fetchCategoriesForStock(stockId) {
    try {
      loading = true;
      selectedStock = stockId;

      const response = await fetch(`http://127.0.0.1:8000/get_categories_for_stock/${stockId}/`, {
        headers: headers
      });
      const data = await response.json();
      categories = data.categories;
      stockchosen = stockId;

      loading = false;
    } catch (error) {
      console.error('Error fetching categories:', error);
      loading = false;
    }
  }

  onMount(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`, {
        headers: headers
      });
      const data = await response.json();
      stocks = data.stocks;
      stockchosen = stocks[0].id;
      loading = false;
      try {
        const response = await fetch(`http://127.0.0.1:8000/get_categories_for_stock/${stocks[0].id}/`, {
          headers: headers
        });
        const data = await response.json();
        categories = data.categories;
        loadingCategories = false;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    } catch (error) {
      console.error('Error fetching stock:', error);
      await refreshToken();
    }
  });
</script>

<BaseLayout>
  {#if loading}
  <Loading></Loading>
  {:else}
  <div id="list-stock">
    <div class="stock-container">
      {#each stocks as stock}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <section class="stock-item {stockchosen === stock.id ? 'selected rotate-hor-center' : ''}" on:click={() => fetchCategoriesForStock(stock.id)}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <a id="cat-link" on:click={()=>fetchCategoriesForStock(stock.id)}>{stock.name}</a>
        </section>
      {/each}
    </div>
  </div>
  {#if loadingCategories}
  <Loading/>
  {:else}
  <br>Categories <br>
    {#if categories.length > 0}
      <!-- Add transition for categories -->
      <div id="cat-container" class="transition-slide">
        {#each categories as item}
          <a id="cat-link" href="/category/?q={item.id}&stock_id={stockchosen}"><div id="cat">{item.name}</div></a>
        {/each}
      </div>
    {:else}
      <div>{translate('Stock.NoItem')}</div>
      <a id="add" href="/add">{translate('Stock.AddProduct')}</a>
    {/if}
  {/if}
  {/if}
</BaseLayout>

<style>
  #add {
    align-items: center;
    color: var(--blue-color);
    text-decoration: none;
    font-size: 26px;
  }

  /* Add styles for the stock container to enable horizontal scrolling */
  .stock-container {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch; /* Enable touch scrolling for webkit browsers (iOS) */
  }

  /* Hide the scroll bar for webkit browsers (Chrome, Safari, etc.) */
  .stock-container::-webkit-scrollbar {
    display: none;
  }

  /* Add styles for the "selected" class */
  .selected {
    box-shadow: 0px 16px 48px 0px rgba(0, 0, 0, 0.176);
  }

  #cat-link {
    color: black;
    text-decoration: none;
  }

  #cat-container {
    width: 100vw;
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;
  }

  #cat {
    background-color: var(--grey-color);
    border-radius: 10px;
    width: 40vw;
    height: 20vw;
    text-align: center;
    font-size: 26px;
    margin: 10px;
  }

  #list-stock {
    font-size: 26px;
    padding: 10px;
    display: flex; /* Change to flex to ensure items are in a row */
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent items from wrapping to the next line */
  }

  .stock-item {
    background-color: var(--blue-color);
    width: 30vw;
    height: 10vw;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    word-wrap: break-word;
  }

  /* Add CSS transition for categories */
  .transition-slide {
    transition: transform 0.2s ease;
  }

  .rotate-hor-center {
	-webkit-animation: rotate-hor-center 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
	        animation: rotate-hor-center 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}

/* ----------------------------------------------
 * Generated by Animista on 2023-8-5 15:50:42
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation rotate-hor-center
 * ----------------------------------------
 */
 @-webkit-keyframes rotate-hor-center {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
  }
  100% {
    -webkit-transform: rotateX(-360deg);
            transform: rotateX(-360deg);
  }
}
@keyframes rotate-hor-center {
  0% {
    -webkit-transform: rotateX(0);
            transform: rotateX(0);
  }
  100% {
    -webkit-transform: rotateX(-360deg);
            transform: rotateX(-360deg);
  }
}



</style>
```