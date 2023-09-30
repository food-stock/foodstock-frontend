<script lang='ts'>
  import { translate } from '$lib/locales/TranslationStore';
  import Cookies from 'js-cookie';import headers from '$lib/requests/headers';
  import constants from '$lib/constants';
  import {goto} from '$app/navigation';

  async function logOut() {
    Cookies.remove('id');
    Cookies.remove('username');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    goto('/');
  }
  
</script>


  <div id="container">
    <img src="/logo.png" alt="Logo">
    <h1>{translate('Settings.Title')}</h1>
  </div>
  
    <div id="cat-container">
        <button id="cat-link" on:click={()=>goto("/managestocks")}>{translate('Settings.ManageStock')}</button>
        <button id="cat-link" on:click={()=>goto("/lang")}>{translate('Settings.Language')}</button>
        <button id="cat-link" on:click={()=>goto("/subscription")}>{translate('Settings.Sub')}</button>
        <button id="cat-link" on:click={()=>goto("/bug")}>{translate('Settings.Bug')}</button>
        <button id="cat-link" on:click={logOut}>{translate('Settings.LogOut')}</button>
        <h3>{constants.Version}</h3>
    </div>


<style>
  h1 {
    color : var(--green-color);
    display: block;
  }

  #container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  #cat-container {
    width: 100vw;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

   #cat-link {
    width: 70vw;
    cursor: pointer;
    padding: 20px;
    border-radius: 15px;
    background-color: var(--white-color);
    text-decoration: none ;
    font-size: 30px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }

  :global(body.dark-mode) #cat-link {
    background-color: black;
    color: var(--white-color);
  }

 #cat-link {
    text-decoration: none;
    margin : 10px;
    color : var(--green-color);
  }

  img {
    width: 150px;
    height: 150px;
    display: block;
    margin-left: -30px;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  h3 {
    color : var(--green-color);
    margin-top: 20px;
    
  }

  button {
    background-color: transparent;
    border: none;
  }
</style>
