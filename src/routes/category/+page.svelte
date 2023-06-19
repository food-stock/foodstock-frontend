<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
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
      let stock = 1;
      let category = 1;
      const response = await fetch(`http://127.0.0.1:8000/get_entities_for_stock_and_category/${stock}/${category}`);
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
  Entities <br>
  <div id="cat-container">
    {#each Entities as item}
      <a id="cat-link" href="/product/?q={item.id}">
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
    color: green;
  }

  .orange {
    color: orange;
  }

  .red {
    color: red;
  }

  #cat-container {
    width: 100vw;
    margin: 10px;
    display: inline-flex;
    flex-wrap: wrap;
  }

  #cat {
    background-color: grey;
    color: white;
    border-radius: 10px;
    width: 40vw;
    height: 38vw;
    text-align: center;
    font-size: 26px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
  }

  #cat-link {
    text-decoration: none;
    color: white;
  }
</style>
