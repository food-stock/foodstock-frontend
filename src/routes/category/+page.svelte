<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Cookies from 'js-cookie';

  let access_token = Cookies.get('access_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const params = new URLSearchParams($page.url.search);
  const cat_id = params.get('q');
  const stock_id = params.get('stock_id');

  let Entities = [];

  function getDaysDifference(dateString) {
    const today = new Date();
    const consumptionDate = new Date(dateString);
    const timeDiff = consumptionDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  }


  function getColorClass(daysDifference) {
    if (daysDifference > 5) {
      return 'green';
    } else if (daysDifference > 2 && daysDifference <=5) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  onMount(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get_entities_for_stock_and_category/${stock_id}/${cat_id}/`, {
      headers: headers
    });
      let data = await response.json();
      data = data.entities;
      Entities = data.map(entity => ({
        ...entity,
        daysDifference: getDaysDifference(entity.date_of_consumption),
        colorClass: getColorClass(getDaysDifference(entity.date_of_consumption)),
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
</script>

<BaseLayout>
  <div id="cat-container">
    {#each Entities as item}
      <a id="cat-link" href="/product/?food_id={item.food_id}">
        <div id="cat">
          {item.food__name} <br>
          {item.quantity}
          <div class="{item.colorClass}">{item.daysDifference} <i class="fa-solid fa-calendar-days"></i></div>
        </div>
      </a>
    {/each}
  </div>
</BaseLayout>

<style>

  .green {
    color: var(--green-color);
  }

  .orange {
    color: var(--orange-color);
  }

  .red {
    color: var(--red-color);
  }

  #cat-container {
    width: 100vw;
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;
  }

  #cat {
    background-color: var(--grey-color);
    color: var(--white-color);
    border-radius: 10px;
    width: 40vw;
    height: 38vw;
    text-align: center;
    font-size: 26px;
    margin: 10px;
  }

  #cat-link {
    text-decoration: none;
    color: var(--white-color);
  }
</style>
