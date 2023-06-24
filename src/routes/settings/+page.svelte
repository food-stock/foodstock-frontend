<script>
  import BaseLayout from '../BaseLayout.svelte';
  import Cookies from 'js-cookie';

  import { _} from 'svelte-i18n'

  async function logOut() {
    Cookies.remove('id');
  }

</script>

<BaseLayout>
  <!--<img id="picture" src="/static/logo.png" alt="Logo">-->
  <div id="container">
    <h1>
      {$_('Settings.Title')}</h1>
    <div id="cat-container">
        <a id="cat-link" href="/managestocks">{$_('Settings.ManageStock')}</a>
        <a id="cat-link" href="/lang">{$_('Settings.Language')}</a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a id="cat-link" on:click={()=>{logOut}}>{$_('Settings.LogOut')}</a>
    </div>
  </div>
</BaseLayout>

<style>
  h1 {
    color : #3fb945;
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
    background-color: white;
    text-decoration: none ;
    font-size: 30px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }

 #cat-link {
    text-decoration: none;
    margin : 10px;
    color : #3fb945;
  }
</style>
