<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import { debounce } from 'lodash-es';
  import { _} from 'svelte-i18n'

  let stocks = [];
  let users = [];
  let id = Cookies.get('id');
  let printstocks = true;
  let stockEdit;
  let isDefault;
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
    const response = await fetch(`http://127.0.0.1:8000/set_stock_default/${stockid}/${isDefault}`);
  }

  async function deleteStockEdited() {
    const stockid = stockEdit.id;
    const response = await fetch(`http:/127.0.0.1:8000/delete_stock/${stockid}`);
  }

  async function renameStockEdited() {
    const newName = stockEdit.name;
    const stockid = stockEdit.id;
    const response = await fetch(`http://127.0.0.1:8000/rename_stock/${stockid}/${newName}`);
  }

  async function manageAccess() {
    printUsers = true;
    const stockid = stockEdit.id;
    const data = await fetch(`http://127.0.0.1:8000/get_users_accessing_stock/${stockid}`);
    const temp = await data.json();
    users = temp.users;
  }

  async function addUsertoStock(user) {
    hasChosen = false;
    const stockid = stockEdit.id;
    const userid = user.id; 
    const data = await fetch(`http://127.0.0.1:8000/add_user_access_to_stock/${stockid}/${userid}`);
    user.text = "✓";
    users = users.filter((u) => u.id !== userid);
    users.push(user);
    hasChosen = true;
  }

  async function removeUserfromStock(user) {
    const stockid = stockEdit.id;
    const userid = user.id; 
    const data = await fetch(`http://127.0.0.1:8000/remove_user_access_to_stock/${stockid}/${userid}`);
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
    if (searchInput.length > 2) {
      const stock_id = stockEdit.id;
      const response = await fetch(`http://127.0.0.1:8000/search_for_users/${searchInput}/${stock_id}`);
      const data = await response.json();
      options = data.users;
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
      const response = await fetch(`http://127.0.0.1:8000/stocks/user/${id}/`);
      stocks = await response.json();
      stocks = stocks.stocks;
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  });
</script>

<BaseLayout>
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
    <button on:click={()=>{searchUsers = false; printstocks = false;}}>{$_('Manage.Back')}</button>
    <h1>{$_('Manage.SearchUser')}</h1>
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
<button on:click={()=>{searchUsers = false; printstocks = false;}}>{$_('Manage.Back')}</button>
  {#if users.length === 0}
  {$_('Manage.NoUserWithAccess')}<br>
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
<button on:click={()=>{searchUsers = false; printstocks = true;}}>{$_('Manage.Back')}</button>
    <h1>{$_('Manage.EditStock')}</h1>
    {$_('Manage.RenameStock')}:
    <input type="text" bind:value={stockEdit.name} /> 
    <button on:click={renameStockEdited}><i class="fa-solid fa-check"></i></button> <br>
    {$_('Manage.SetDefaultStock')}
    <input type="checkbox" on:change={toogleDefault} value={isDefault}/> <br>
    {$_('Manage.DeleteStock')} :
    <button on:click={deleteStockEdited}>{$_('Manage.Delete')}</button> <br>
    {$_('Manage.ManageAccess')}
    <button on:click={manageAccess}>{$_('Manage.Manage')}</button> <br>
    
  </div>
{/if}
</BaseLayout>

<style>

  #cat-link {
    text-decoration: none;
    color: white;
    justify-content: space-between;
    align-items: center;
  }

  #list-stock {
    font-size: 26px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
    padding: 10px;
    display: block;
    flex-wrap: wrap ;
  }

  .stock-item{
    width: 70vw;
    background-color: aqua;
    width: 30vw;
    height: 10vw;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
  }

  .li {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
  }

</style>
