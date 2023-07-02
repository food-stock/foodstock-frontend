<script lang="ts">
  import { translate } from '../../TranslationStore';
  import BaseLayout from '../BaseLayout.svelte';
  import Back from '$lib/Back.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import { debounce } from 'lodash-es';
  import { goto } from '$app/navigation';

  let access_token = Cookies.get('access_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  //back
  let name = translate('Manage.Back');
  let link = '/settings';
  
  let stocks = [];
  let users = [];
  let id = Cookies.get('id');
  let printstocks = true;
  let stockEdit;
  let isDefault;
  let isPersonal;
  let printUsers = false;
  let searchUsers = false;
  let searchInput = '';
  let options = [];
  let hasChosen = false;

  function manageStock(stock) {
    stockEdit = stock;
    printstocks = false;
    isDefault = stock.is_default;
  }

  async function toogleDefault() {
    const stockid = stockEdit.id;
    isDefault = !isDefault;
    const response = await fetch(`http://127.0.0.1:8000/set_stock_default/${stockid}/${isDefault}/`, {
      headers: headers, method: 'POST'
    });
  }

  async function tooglePersonal() {
    const stockid = stockEdit.id;
    isPersonal = !isPersonal;
    const response = await fetch(`http://127.0.0.1:8000/set_stock_personal/${stockid}/${isDefault}/`, {
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
      const response = await fetch(`http://127.0.0.1:8000/delete_stock/${stockid}/`, {
      headers: headers, method: 'POST'
    });
    }
  }

  async function renameStockEdited() {
    const newName = stockEdit.name;
    const stockid = stockEdit.id;
    const response = await fetch(`http://127.0.0.1:8000/rename_stock/${stockid}/${newName}/`, {
      headers: headers, method: 'POST'
    });
  }

  async function manageAccess() {
    printUsers = true;
    const stockid = stockEdit.id;
    const data = await fetch(`http://127.0.0.1:8000/get_users_accessing_stock/${stockid}/`, {
      headers: headers
    });
    const temp = await data.json();
    users = temp.users;
  }

  async function addUsertoStock(user) {
    hasChosen = false;
    const stockid = stockEdit.id;
    const userid = user.id; 
    const data = await fetch(`http://127.0.0.1:8000/add_user_access_to_stock/${stockid}/${userid}/`, {
      headers: headers, method: 'POST'
    });
    user.text = "✓";
    users = users.filter((u) => u.id !== userid);
    users.push(user);
    hasChosen = true;
  }

  async function removeUserfromStock(user) {
    const stockid = stockEdit.id;
    const userid = user.id; 
    const data = await fetch(`http://127.0.0.1:8000/remove_user_access_to_stock/${stockid}/${userid}/`, {
      headers: headers, method: 'POST'
    });
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

  const fetchData = debounce(async () => {
    if (searchInput.length > 1) {
      const stock_id = stockEdit.id;
      const response = await fetch(`http://127.0.0.1:8000/search_for_users/${searchInput}/${stock_id}/`, {
      headers: headers
    });
      const data = await response.json();
      options = data.users;
      //limit to the 10 first results
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
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`, {
      headers: headers
    });
      stocks = await response.json();
      stocks = stocks.stocks;
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  });
</script>

<BaseLayout>
  
<Back {name} {link} />

{#if printstocks}
  <div id="list-stock">
    {#each stocks as stock}
      <div class="stock-item">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <a id="cat-link" on:click={()=>manageStock(stock)}>{stock.name}</a>
      </div>
    {/each}
  </div>

{:else if searchUsers}
  <div id="container">
    <button on:click={()=>{searchUsers = false; printstocks = false;}}>{translate('Manage.Back')}</button>
    <h1>{translate('Manage.SearchUser')}</h1>
    <input type="text" bind:value={searchInput} on:input={handleInput} />
    {#if !hasChosen}
    <ul>
      {#each options as option}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li >
          {option.username}
          <button on:click={()=>addUsertoStock(option)}>{option.text}</button>
        </li>
      {/each}
    </ul>
    {:else}
    <ul>
      {#each options as option}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li >
          {option.username}
          <button on:click={()=>addUsertoStock(option)}>{option.text}</button>
        </li>
      {/each}
    </ul>
    {/if}
  </div>
  

{:else if printUsers}
<button on:click={()=>{searchUsers = false; printstocks = false;}}>{translate('Manage.Back')}</button>
  {#if users.length === 0}
  {translate('Manage.NoUserWithAccess')}<br>
  {:else}
    <div id="list-stock">
      {#each users as user}
        <div class="stock-item">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div id="cat-link" >
            {user.username}
            <button on:click={()=>removeUserfromStock(user)}><i class="fa-solid fa-minus"></i></button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
  <div class="stock-item">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <a id="cat-link" on:click={addUser}><i class="fa-solid fa-plus"></i></a>
  </div>

{:else}
  <div id="container">
<button on:click={()=>{searchUsers = false; printstocks = true;}}>{translate('Manage.Back')}</button>
    <h1>{translate('Manage.EditStock')}</h1>
    {translate('Manage.RenameStock')}:
    <input type="text" bind:value={stockEdit.name} /> 
    <button on:click={renameStockEdited}><i class="fa-solid fa-check"></i></button> <br>
    {translate('Manage.SetDefaultStock')}
    <input type="checkbox" on:change={toogleDefault} value={isDefault}/> <br>
    {translate('Manage.DeleteStock')} :
    <button on:click={deleteStockEdited}>{translate('Manage.Delete')}</button> <br>
    {translate('Manage.SetPersonalStock')}
    <input type="checkbox" on:change={tooglePersonal} value={isPersonal}/> <br>
    {#if !isPersonal}
    {translate('Manage.ManageAccess')}
    <button on:click={manageAccess}>{translate('Manage.Manage')}</button> <br>
    {/if}
    
  </div>
{/if}
</BaseLayout>

<style>

  #cat-link {
    text-decoration: none;
    color: var(--white-color);
    justify-content: space-between;
    align-items: center;
  }

  #list-stock {
    font-size: 26px;
    margin: 10px;
    padding: 10px;
    display: block;
    flex-wrap: wrap ;
  }

  .stock-item{
    width: 70vw;
    background-color: var(--blue-color);
    width: 30vw;
    height: 10vw;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
  }

</style>
