<script lang="ts">
  import { translate } from '$lib/locales/TranslationStore';
  import Back from '$lib/nav/Back.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import headers from '$lib/requests/headers';
  import constants from '$lib/constants';
  import { addToast } from "$lib/stores/notif";
  import { debounce } from 'lodash-es';
  import Loading from '../../lib/nav/Loading.svelte';
  import ButtonFavorite from '$lib/interactions/ButtonFavorite.svelte';
  import Dialog from '$lib/interactions/Dialog.svelte';
  import DialogInput from '$lib/interactions/DialogInput.svelte';
  
  //back
  let name = translate('Manage.Back');
  let link = '/settings';
  
  let loading: boolean = true;
  let stocks: any[] = [];
  let users:any[] = [];
  let id = Cookies.get('id');
  let printstocks = true;
  let stockEdit: boolean;
  let isPersonal: boolean;
  let printUsers : boolean = false;
  let searchUsers : boolean = false;
  let searchInput = '';
  let options:any = [];
  let hasChosen : boolean = false;
  let showDialogUserRm = false;
  let createstock:boolean = false;
  let stockname:string;

  function manageStock(stock:any) {
    stockEdit = stock;
    printstocks = false;
    isDefault = stock.is_default;
  }


  async function tooglePersonal() {
    const stockid = stockEdit.id;
    isPersonal = !isPersonal;
    const response = await fetch(`${constants.ADD_API}set_stock_personal/${stockid}/${isPersonal}/`, {
      headers: headers, method: 'POST'
    });
    if (!response.ok) {
      isPersonal = !isPersonal;
      alert("Error");
    }
  }

  async function deleteStockEdited() {
    const stockid = stockEdit.id;
    //Pop up to confirm
    if (confirm("Are you sure you want to delete this stock ?")) {
      const response = await fetch(`${constants.ADD_API}delete_stock/${stockid}/`, {
      headers: headers, method: 'POST'
    });
    }
  }

  async function renameStockEdited() {
    const newName = stockEdit.name;
    const stockid = stockEdit.id;
    const response = await fetch(`${constants.ADD_API}rename_stock/${stockid}/${newName}/`, {
      headers: headers, method: 'POST'
    });
  }

  async function manageAccess() {
    printUsers = true;
    const stockid = stockEdit.id;
    const data = await fetch(`${constants.ADD_API}get_users_accessing_stock/${stockid}/`, {
      headers: headers
    });
    const temp = await data.json();
    users = temp.users;
  }

  async function addUsertoStock(user) {
    hasChosen = false;
    const stockid = stockEdit.id;
    const userid = user.id; 
    const data = await fetch(`${constants.ADD_API}add_user_access_to_stock/${stockid}/${userid}/`, {
      headers: headers, method: 'POST'
    });
    user.text = "✓";
    addToast({ message: translate('Manage.UserAdded'), type: "success", dismissible: true, timeout: constants.delayNotification });
    users = users.filter((u) => u.id !== userid);
    users.push(user);
    hasChosen = true;
  }

  async function removeUserfromStock(user) {
    const stockid = stockEdit.id;
    const userid = user.id; 
    const data = await fetch(`${constants.ADD_API}remove_user_access_to_stock/${stockid}/${userid}/`, {
      headers: headers, method: 'POST'
    });
    addToast({ message: translate('Manage.UserRemoved'), type: "success", dismissible: true, timeout: constants.delayNotification });
    //Remove the user from the list
    users = users.filter((u) => u.id !== userid);
  }

  function addUser() {
    printUsers = false;
    printstocks = false;
    searchUsers = true;
  }

  function handleInput(event) {
    searchInput = event.target.value;
    fetchData();
  }

  function preCreateStock() {
    createstock = true;
  }

  async function createStock() {
    const userid = Cookies.get('id');
    const response = await fetch(`${constants.ADD_API}create_stock/${userid}?name=${stockname}`, {
      headers: headers, method: 'POST'
    });
    const data = await response.json();
    const stock = data.stock;
    stocks.push(stock);
    manageStock(stock);
  }

  const fetchData = debounce(async () => {
    if (searchInput.length > 1) {
      const stock_id = stockEdit.id;
      const response = await fetch(`${constants.ADD_API}search_for_users/${searchInput}/${stock_id}/`, {
      headers: headers
    });
      const data = await response.json();
      options = data.users;
      if (options.length > 10) {
        options = options.slice(0, 10);
      }
      //for each, add a .text containing <i class="fa-solid fa-plus"></i> or <i class="fa-solid fa-check"></i>
      options = options.map((option) => ({
        ...option,
        text: "+",
      }));
    } else {
      options = [];
    }
  }, 300);

  onMount(async () => {
    //Fetch the stocks of the user
    try {
      const response = await fetch(`${constants.ADD_API}stocks/user/${id}/`, {
      headers: headers
    });
      stocks = await response.json();
      stocks = stocks.stocks;
      loading = false;
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  });
</script>


  {#if loading}
    <Loading />
  {:else}

{#if printstocks}
<div class="title">{translate("Manage.FindStock")}</div>
<button class="plus" on:click={()=>preCreateStock}>+</button>
<DialogInput
title ='New Stock'
content = 'Enter the name of your new stock : '
acceptLabel = 'Perfect !'
refuseLabel = 'Cancel this .. '
onAccept = {()=>createStock}
onRefuse={() => (null)}
bind:show={createstock}
bind:input={stockname}
/>

/>
  <div id="list-stock">
    {#each stocks as stock}
      <div class="stock-item">
        <button id="cat-link" on:click={()=>manageStock(stock)}>{stock.name}</button>
      </div>
    {/each}
</div>

{:else if searchUsers}
<button class="bton" on:click={()=>{searchUsers = false; printstocks = true;}}>{translate('Manage.Back')}</button>
<div id="container">
    <h1>{translate('Manage.SearchUser')}</h1>
    <input class="input" placeholder={translate("TypeHere")} type="text" bind:value={searchInput} on:input={handleInput} />
    {#if !hasChosen}
    <ul>
      {#each options as option}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li >
          {option.username}
          <button class="bton" on:click={()=>addUsertoStock(option)}>{option.text}</button>
        </li>
      {/each}
    </ul>
    {:else}
    <ul>
      {#each options as option}
        <li >
          {option.username}
          <button class="bton" on:click={()=>showDialogUserRm = true}>{option.text}</button>
            <Dialog
            title ='Remove user from stock'
            content = 'Are you sure you want to remove {option.username} from the stock ?'
            acceptLabel = 'Accept'
            refuseLabel = 'Refuse'
            onAccept = {()=>addUsertoStock(option)}
            onRefuse={() => showDialogUserRm = false}
            bind:show={showDialogUserRm}
            />
        </li>
      {/each}
    </ul>
    {/if}
</div>
  

{:else if printUsers}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<button class="bton" on:click={()=>{searchUsers = false; printstocks = false;}}>{translate('Manage.Back')}</button>
  {#if users.length === 0}
  <div>{translate('Manage.NoUserWithAccess')}</div>
  {:else}
    <div id="list-stock">
      {#each users as user}
        <div class="stock-item">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div id="cat-link" >
            {user.username}
            <button class="bton" on:click={()=>removeUserfromStock(user)}><i class="fa-solid fa-minus"></i></button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  <div class="stock-item">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a id="cat-link" on:click={addUser}><i class="fa-solid fa-plus"></i></a>
  </div>

{:else}
<div class='row'>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <button class="bton" on:click={()=>{searchUsers = false; printstocks = true;}}>{translate('Manage.Back')}</button>
</div>
  <div id="container">

    <div class="topc row">
      <div class="title">{translate('Manage.EditStock')} : {stockEdit.name}</div>
      <ButtonFavorite stockEdit={stockEdit} />
    </div>

    <div class='row'>
      <div class="text">{translate('Manage.RenameStock')}</div>
      <input class="input" placeholder={translate("TypeHere")} type="text" bind:value={stockEdit.name} /> 
    <button class="bton" on:click={renameStockEdited}><i class="fa-solid fa-check"></i></button> 
    </div>

    <div class='row'>
      <div class="text">{translate('Manage.DeleteStock')} </div>
      <button class="bton" on:click={deleteStockEdited}>{translate('Manage.Delete')}</button> <br>
    </div>
    <div class='row'>
      <div class="text">{translate('Manage.SetPersonalStock')}</div>
      <div class="checkbox-wrapper-12">
        <div class="cbx">
          <input id="cbx-12" type="checkbox" on:change={tooglePersonal} bind:checked={isPersonal}/>
          <label for="cbx-12"></label>
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2"></path>
          </svg>
        </div>
        
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo-12">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
              <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
    </div>

    {#if !isPersonal}
    <div class='row'>
      <div class="text">{translate('Manage.ManageAccess')}</div>
      <button class="bton" on:click={manageAccess}>{translate('Manage.Manage')}</button> <br>
    </div>
    {/if}
    
  </div>
{/if}
{/if}


<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    border : 1px var(--grey-color) solid;
    padding: 10px;
    border-radius: 65px;
  }

  .text {
    margin-right: 5vw;
  }

  .title {
    font-size: 26px;
    margin: 10px;
    padding: 10px;
    display: block;
  }

  .row {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    display: flex;
    flex-direction: row ;
  }

  .topc {
    display: inline-flex;
    justify-content: space-between;
  }

  .bton {
    color: var(--dark-color);
    border : 1px  var(--grey-color) solid;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
  }

  #cat-link {
    text-decoration: none;
    color: var(--white-color);
    justify-content: space-between;
    align-items: center;
    color : var(--blue-color);
  }

  #list-stock {
    margin-top: 10px;
    font-size: 26px;
    display: block;
    flex-wrap: wrap ;
  }

  .stock-item{
    width: 90vw;
    height: 10vw;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    border : 1px var(--blue-color) solid;
  }

.checkbox-wrapper-12 {
  position: relative;
  margin-left: 5vw;
}

.checkbox-wrapper-12 > svg {
  position: absolute;
  top: -130%;
  left: -170%;
  width: 110px;
  pointer-events: none;
}

.checkbox-wrapper-12 * {
  box-sizing: border-box;
}

.checkbox-wrapper-12 input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0;
}

.checkbox-wrapper-12 input[type="checkbox"]:focus {
  outline: 0;
}

.checkbox-wrapper-12 .cbx {
  width: 24px;
  height: 24px;
  top: calc(100px - 12px);
  left: calc(100px - 12px);
}

.checkbox-wrapper-12 .cbx input {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border: 2px solid var(--grey-color);
  border-radius: 50%;
}

.checkbox-wrapper-12 .cbx label {
  width: 24px;
  height: 24px;
  background: none;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  transform: trasnlate3d(0, 0, 0);
  pointer-events: none;
}

.checkbox-wrapper-12 .cbx svg {
  position: absolute;
  top: 5px;
  left: 4px;
  z-index: 1;
  pointer-events: none;
}

.checkbox-wrapper-12 .cbx svg path {
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 19;
  stroke-dashoffset: 19;
  transition: stroke-dashoffset 0.3s ease;
  transition-delay: 0.2s;
}

.checkbox-wrapper-12 .cbx input:checked + label {
  animation: splash-12 0.6s ease forwards;
}

.checkbox-wrapper-12 .cbx input:checked + label + svg path {
  stroke-dashoffset: 0;
}

@-moz-keyframes splash-12 {
  40% {
    background: var(--green-color);
    box-shadow: 0 -18px 0 -8px var(--green-color), 16px -8px 0 -8px var(--green-color), 16px 8px 0 -8px var(--green-color), 0 18px 0 -8px var(--green-color), -16px 8px 0 -8px var(--green-color), -16px -8px 0 -8px var(--green-color);
  }

  100% {
    background: var(--green-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}

@-webkit-keyframes splash-12 {
  40% {
    background: var(--green-color);
    box-shadow: 0 -18px 0 -8px var(--green-color), 16px -8px 0 -8px var(--green-color), 16px 8px 0 -8px var(--green-color), 0 18px 0 -8px var(--green-color), -16px 8px 0 -8px var(--green-color), -16px -8px 0 -8px var(--green-color);
  }

  100% {
    background: var(--green-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}

@-o-keyframes splash-12 {
  40% {
    background: var(--green-color);
    box-shadow: 0 -18px 0 -8px var(--green-color), 16px -8px 0 -8px var(--green-color), 16px 8px 0 -8px var(--green-color), 0 18px 0 -8px var(--green-color), -16px 8px 0 -8px var(--green-color), -16px -8px 0 -8px var(--green-color);
  }

  100% {
    background: var(--green-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
}

@keyframes splash-12 {
  40% {
    background: var(--green-color);
    box-shadow: 0 -18px 0 -8px var(--green-color), 16px -8px 0 -8px var(--green-color), 16px 8px 0 -8px var(--green-color), 0 18px 0 -8px var(--green-color), -16px 8px 0 -8px var(--green-color), -16px -8px 0 -8px var(--green-color);
  }

  100% {
    background: var(--green-color);
    box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
  }
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
  color:  var(--grey-color);
}

.input:focus {
  border: 1px solid var(--green-color);
  box-shadow: 0 0 0 4px #3b83f65f
}

</style>
