<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import Cookies from 'js-cookie';import headers from '$lib/requests/headers';
  import {goto} from '$app/navigation';

  async function logOut() {
    Cookies.remove('id');
    Cookies.remove('username');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    goto('/');
  }


</script>


  <img id="picture" src="/logo.png" alt="Logo">
  <div id="container">
    <h1>
      {translate('Settings.Title')}</h1>
    <div id="cat-container">
        <a id="cat-link" href="/managestocks">{translate('Settings.ManageStock')}</a>
        <a id="cat-link" href="/lang">{translate('Settings.Language')}</a>
        <a id="cat-link" href="/subscription">{translate('Settings.Sub')}</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a id="cat-link" on:click={logOut}>{translate('Settings.LogOut')}</a>
    </div>
  </div>


<style>
  h1 {
    color : var(--green-color);
  }

  #container {
    display: block;
    flex-direction: column;
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

  #picture {
    width: 150px;
    height: 150px;
  }
</style>
