<script>
  import BaseLayout from '../BaseLayout.svelte';
  import Cookies from 'js-cookie';
  import { _} from 'svelte-i18n'

  let access_token = Cookies.get('access_token');
  let refresh_token = Cookies.get('refresh_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  let id = Cookies.get('id');

  import { locale } from 'svelte-i18n';
  locale.set('fr')


</script>

<BaseLayout>
<a id="retour" href="/settings">{$_('Settings.Back')}</a>
<br>
  Unfortunatly, we dont support other languages then french/english for now.
<br>
  Future supported languages : 
  <ul>
    <li>Anglais</li>
    <li>Français</li>
    <li>Allemand</li>
    <li>Italien</li>
    <li>Espagnol</li>
  </ul>
</BaseLayout>

<style>

  ul {
    flex-direction: row;
    list-style-type: none;
    padding: 0;
    justify-content: center;
  }

  li {
    cursor: pointer;
    padding: 10px;
    border-radius: 15px;
    background-color: beige;
    text-align: center;
    margin : 10px;
  }

  #retour {
    text-decoration: none;
    color :#3fb945;
    margin : 10px;
    padding: 10px;
  }
</style>
