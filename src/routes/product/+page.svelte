<script lang='ts'>
  import { translate } from '$lib/locales/TranslationStore';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';import headers from '$lib/requests/headers';
import constants from '$lib/constants';
  import { page } from '$app/stores'

  const params = new URLSearchParams($page.url.search);
  const food_id = params.get('food_id');

  let id = Cookies.get('id');
  let Entity : any = [];
  let food_info = {};
  let data = {};
  let productIsDisplayed = false;
  let yaPlusOpened = false;
  let openQuantityM = false;
  let integer: string = '0';
  let decimal = 0;
  let itemdedited: any = {};
  let showEntity = true;
  let qtte_totale = 0;

  function getDaysDifference(dateString:string) {
    const today : any = new Date();
    const consumptionDate : any = new Date(dateString);
    const timeDiff : any = consumptionDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  }

  function getColorClass(daysDifference : number) {
    if (daysDifference > 5) {
      return 'green';
    } else if (daysDifference > 2 && daysDifference <=5) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  function increaseUnit() {
    integer = parseInt(integer) +  1;
  }

  function decreaseUnit() {
    if (parseInt(integer) > 1) {
      integer = parseInt(integer) - 1;
    }
  }

  function setDecimal0() {
    decimal = 0;
  }

  function setDecimal025() {
    decimal = 0.25;
  }

  function setDecimal05() {
    decimal = 0.5;
  }

  function setDecimal075() {
    decimal = 0.75;
  }

  async function registerQuantity() {
    let quantity = parseInt(integer) + decimal;
    const entity_id = itemdedited.id;
    const response = fetch(`${constants.ADD_API}update_entity_quantity/${entity_id}/${quantity}/`, {
      headers: headers,
      method: 'POST'
    });
    Entity.forEach((entity: { id: any; quantity: number; }) => {
        if (entity.id === entity_id) {
          entity.quantity = quantity;
        }
    });
    Entity = Entity.filter(entity => entity.quantity > 0);
    qtte_totale = Entity.reduce((acc: any, entity: { quantity: any; }) => acc + entity.quantity, 0);
    openQuantityM = false;
    yaPlusOpened = false;
    productIsDisplayed = false;
    showEntity = true;
  }

  function missclick() {
    openQuantityM = false;
    yaPlusOpened = false;
    productIsDisplayed = false;
    showEntity = true;
  }

  function nomore() {
    integer = 0;
    decimal = 0;
    registerQuantity();
  }

  async function yAPlus(item: any) {
    showEntity = false;
    itemdedited = item;
    productIsDisplayed = true;
    yaPlusOpened = true;
    openQuantityM = false;
  }

  async function openQuantityMenu(item: { quantity: string; }) {
    showEntity = false;
    itemdedited = item;
    integer = parseInt(item.quantity);
    productIsDisplayed = true;
    yaPlusOpened = false;
    openQuantityM = true;
  }
  
  onMount(async () => {
    try {
      const response = await fetch(`${constants.ADD_API}get_entity_by_id/${food_id}/${id}/`, {
      headers: headers
    });
      data = await response.json();
      Entity = data.entity;
      Entity = Entity.map((entity: { date_of_consumption: string; }) => ({
        ...entity,
        daysDifference: getDaysDifference(entity.date_of_consumption),
        colorClass: getColorClass(getDaysDifference(entity.date_of_consumption)),
      }));
      food_info = data.food_info[0]
      qtte_totale = Entity.reduce((acc: any, entity: { quantity: any; }) => acc + entity.quantity, 0);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
</script>


  <div id="container-infos">
    <div id="left">
    <div id="foodname">{food_info.food__name} </div>    
    <img id="picture" alt="Product" src="{food_info.food__picture}">
    </div>
    <div id="right">
      {translate('Product.PresentInStock')} 
      <div id="info"><span style="font-size:40px;font-weight: bold; margin-right:6px;"> {Entity.length} </span> {translate('Product.Stocks')} </div>
      <div id="info"><span style="font-size:30px;font-weight: bold; margin-right:6px;"> {qtte_totale} </span> {translate('Product.Exemplaires')} </div>
    </div>
  </div> 

  <div id="container-entity">


{#if showEntity}
  {#if Entity.length === 0}
    {translate('Product.NotPresentInStock')}
  {:else}
    {#if Entity.length > 0}
    
      {#each Entity as item}
      {#if item.quantity > 0}
        <ul class="no-bullet">
          <div id="container-buttons">
            <div class="name" id="btton">{item.stock__name} </div>
            <div class="qtty" id="btton">{item.quantity} {translate('Product.Remaining')} </div>
            <div class="{item.colorClass}" id="btton"> <i class="fa-solid fa-calendar-days"></i> {item.daysDifference} </div>
          </div>
          <li>{translate('Product.BoughtOn')} : {item.date_of_purchase} </li>

          <div id="container-buttons">
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="adjust" on:click={() => openQuantityMenu(item)} id="btton">{translate('Product.AdjustQuantity')}</div>
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-no-static-element-interactions -->
              <div class="nomore" on:click={()=>yAPlus(item)} id="btton">{translate('Product.NoMore')} </div>
          </div>
        </ul>
      {/if}
      {/each}
    {/if}
  {/if}
{/if}

{#if yaPlusOpened}
  <br>
  {translate('Product.NoMore?')} <br>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div id="container-buttons">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="nomore" on:click={nomore} id="btton">{translate('Product.NoMore')}</div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="remaining" on:click={missclick} id="btton">{translate('Product.ThereAreSome')}</div>
  </div>
{/if}

{#if openQuantityM}
{translate('Product.QtyRemaining')}
<div class="unit-controls">
  <button class="unit-button" id="decrease-unit" on:click={decreaseUnit}>-</button>
  <input type="text" class="unit-input" id="unit-input" bind:value={integer}>
  <button class="unit-button" id="increase-unit" on:click={increaseUnit}>+</button>
</div>
{translate('Product.Precision')}
<div class="button-container">
  <button class="button" class:selected={decimal === 0} id="button-4" on:click={setDecimal0}>0</button>
  <button class="button" class:selected={decimal === 0.25} id="button-1" on:click={setDecimal025}>&frac14;</button>
  <button class="button" class:selected={decimal === 0.5} id="button-2"on:click={setDecimal05} >&frac12;</button>
  <button class="button" class:selected={decimal === 0.75} id="button-3"on:click={setDecimal075} >&frac34;</button>
</div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="container-buttons">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="validate" on:click={registerQuantity} id="btton">{translate('Product.AllGood')}</div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="remaining" on:click={missclick} id="btton">{translate('Product.MissClick')}</div>
</div>
{/if}


</div>


<style>

  .red {
    background-color: var(--red-color);
    border: solid 1px var(--red-color);
  }

  .green {
    background-color: var(--green-color);
    border: solid 1px var(--green-color);
  }

  .orange {
    background-color: var(--orange-color);
    border: solid 1px var(--orange-color);
  }

  #picture {
    width: auto;
    height: 150px;
    padding: 10px;
  }

  #container-entity {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #container-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  #btton {
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    color : var(--white-color);
  }

  .adjust {
    background-color:var(--green-color);
    border: solid 1px var(--green-color);
  }

  .nomore {
    background-color: var(--red-color);
    border: solid 1px var(--red-color);
  }
  .validate {
    background-color: var(--green-color);
    border: solid 1px var(--green-color);
  }

  .iconic {
    background-color: var(--blue-color);
    border: solid 1px var(--blue-color);
  }

  .remaining {
    background-color: var(--orange-color);
    border: solid 1px var(--orange-color);
  }

  ul.no-bullet {
  width: 80vw;
  list-style-type: none;
  border-radius: 15px;
  padding: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }

  .name , .qtty {
    background-color: var(--grey-color);
    border: solid 1px var(--grey-color);
  }

  .name {
    background-color: var(--blue-color);
  }

  #foodname {
    font-size: 30px;
    font-weight: bold;
    margin: 10px;
    align-items: center;
    justify-content: center;
  }

  .button-container {
  display: flex;
  justify-content: space-between;
}

.button, .unit-button {
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 7px;
  padding: 10px 20px;
  border: none;
  background-color: var(--grey-color);
  color: #333;
  font-weight: bold;
  cursor: pointer;
}

.button:hover {
  background-color: var(--grey-color);
}

.unit-controls {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.unit-input {
  width: 50px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  margin: 0 10px;
  margin-top: 20px;
}

.selected {
  color: var(--white-color);
}

#container-infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 92vw;
}

#left{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#right{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
  
</style>
