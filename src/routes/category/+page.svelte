<script lang='ts'>
  import { translate } from '../../TranslationStore';
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
          <div id="left">
          {item.food__name}  
          </div>
          <div id="middle"> {item.quantity} 
          <svg class="svg" fill="#ffff" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M483.81,39.561h-26.932c-3.719,0-6.733,3.014-6.733,6.733v39.837h-14.226V48.649c3.01-0.672,5.262-3.354,5.262-6.567 V6.733c0-3.719-3.015-6.733-6.733-6.733H318.835c-3.718,0-6.733,3.014-6.733,6.733v35.349c0,3.213,2.252,5.895,5.262,6.567v37.483 H259.22V48.815h1.288c3.718,0,6.733-3.015,6.733-6.733V6.733c0-3.718-3.015-6.733-6.733-6.733H84.274 c-3.718,0-6.733,3.015-6.733,6.733v35.349c0,3.718,3.015,6.733,6.733,6.733h1.288v37.317H61.856V46.294 c0-3.719-3.014-6.733-6.733-6.733H28.19c-3.719,0-6.733,3.014-6.733,6.733v458.972c0,3.719,3.014,6.733,6.733,6.733h26.932 c3.719,0,6.733-3.014,6.733-6.733v-46.571h388.288v46.571c0,3.719,3.014,6.733,6.733,6.733h26.932 c3.719,0,6.733-3.014,6.733-6.733V46.294C490.543,42.576,487.529,39.561,483.81,39.561z M48.39,92.865v26.932v139.151v26.932 v139.151v26.932v46.571H34.923V53.028H48.39V92.865z M325.569,13.466h102.144v21.883H325.569V13.466z M422.452,48.815v37.317 h-91.62V48.815H422.452z M91.007,13.466h162.769v21.883h-1.288H92.295h-1.288V13.466z M245.753,48.815v37.317H99.028V48.815 H245.753z M61.856,129.255l173.571,60.117L61.856,249.49V129.255z M95.135,126.531h321.73L256,182.247L95.135,126.531z M416.865,252.215H95.135L256,196.499L416.865,252.215z M450.144,445.23H61.856v-13.163l0.875-0.303h386.534l0.879,0.304V445.23z M294.174,332.166h-92.833l0.162-0.468L88.657,292.612h334.682L299.9,335.369C298.714,333.45,296.596,332.166,294.174,332.166z M410.387,418.298H292.885v-37.317h1.288c1.592,0,3.052-0.555,4.205-1.479L410.387,418.298z M125.96,367.515h-1.288v-21.883 h162.769v21.883h-1.288H125.96z M279.419,380.981v37.317H132.694v-37.317H279.419z M161.709,332.166h-43.77 c-3.718,0-6.733,3.015-6.733,6.733v35.349c0,3.718,3.015,6.733,6.733,6.733h1.288v16.96l-57.372,19.875V297.581L161.709,332.166z M119.227,412.192v6.106h-17.625L119.227,412.192z M450.144,417.818l-149.237-51.691v-16.855l149.237-51.691V417.818z M450.144,279.147H61.856v-13.466h388.288V279.147z M450.144,249.49l-173.571-60.118l173.571-60.117V249.49z M450.144,113.064 H61.856V99.598h388.288V113.064z M477.077,498.534H463.61V53.028h13.466V498.534z"></path> </g> </g> </g></svg>
          </div>
          <div class="{item.colorClass} right">{item.daysDifference} <i class="fa fa-solid fa-calendar-days"></i></div>
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
    flex-direction: column;
  }

  #cat {
    background-color: var(--grey-color);
    color: var(--white-color);
    border-radius: 10px;
    width: 80vw;
    height: 20vw;
    text-align: center;
    font-size: 26px;
    align-items: center;
    justify-content: center;
    display: inline-flex;
  }

  #cat-link {
    text-decoration: none;
    color: var(--white-color);
  }

  .svg {
    width: 5vw;
    height: 5vw;
  }

  #left {
    margin-right: 20px;
  }

  #middle {
    margin-right: 20px;
  }

  .right {
    margin-right: 20px;
  }

  .fa {
    font-size: 20px;
    transform: translate(0, -20%);
  }
</style>
