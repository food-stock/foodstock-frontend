<script>
  import BaseLayout from '../BaseLayout.svelte';
  import Cookies from 'js-cookie';
  import { _} from 'svelte-i18n';
  import Back from '$lib/Back.svelte';

  //back
  let name = $_('Manage.Back');;
  let link = '/managestocks';

  let access_token = Cookies.get('access_token');
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
  <Back {name} {link} />
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
</style>
