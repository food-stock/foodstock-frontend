<script>
    //export const ssr = false; 
    import Cookies from 'js-cookie';
    let user = Cookies.get('username');

    import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

    register('fr', () => import('../locales/fr.json'));
    register('en', () => import('../locales/en.json'));

    console.log('init i18n');

    init({
    fallbackLocale: 'en',
    initialLocale: 'en',
    });

    import { _} from 'svelte-i18n'

    import { locale } from 'svelte-i18n';
    locale.set('en')

</script>

<a href="/add">
    <button id="bttonA"><i class="fa-solid fa-plus"></i></button>
</a>
<a href="/stock">
    <button id="bttonH"><i class="fa-solid fa-home"></i></button>
</a>

<div class="container">
<header>
    <div id="header">
        <a href="/settings">
            <button id="bttonL"><i class="fa-solid fa-gear"></i></button>
        </a>
        {$_('BaseLayout.Hi')}, {user}
        <a href="/search">
            <button id="btton"><i id="icon_search" class="fa-solid fa-magnifying-glass"></i></button>
        </a>
    </div>
        
</header>

<main>
    <slot></slot>
</main>
  
<footer>
<!--
    <div id="whitespace"></div>
    <div id="footer">
        <a id="buttonfooter" href="/stock"><i id="icon_house" class="fa-solid fa-house"></i></a>
        <a id="buttonfooter" href="/list"><i id="icon_list" class="fa-solid fa-list"></i></a>
        <a id="buttonfooter" href="/social"><i id="icon_heart" class="fa-solid fa-heart"></i></a>
        <a id="buttonfooter" href="/stock"><i id="icon_user" class="fa-solid fa-user"></i></a>
    </div>
-->
</footer>

</div>

<style>

@import '@fortawesome/fontawesome-free/css/all.css';

main {
    overflow: hidden;
}

#header {
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
    margin-top: 20px;
}

#icon_search {
    float: right; /* Float the search element to the right */
    text-align: center;
    text-decoration: none;
    color: black;
}

#footer {
    background-color: grey;
    color: #fff;
    padding: 2px;
    padding-bottom: 10px;
    text-align: center;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    margin-top: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}

#icon_house, #icon_list, #icon_heart, #icon_user {
    color: #3fb945;
    font-size: 30px;
    margin: 10px;
    margin-left: 22px;
    margin-right: 22px;
}

#btton , #buttonfooter, #bttonL{
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 20px;
}

#btton {
  float: right;
}
#btton:hover {
    color: #3fb945;
}
#bttonL {
  float: left;
}
#bttonL:hover {
    color: #3fb945;
}

#bttonA {
  width: 60px;
  height: 60px;
  border-radius: 40px;
  color: #3fb945;
  border : none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: fixed; 
  bottom: 70px; 
  right: 10px;
  font-size: 40px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
#bttonH {
  width: 60px;
  height: 60px;
  border-radius: 40px;
  color: #3fb945;
  border : none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  position: fixed; 
  bottom: 5px; 
  right: 10px;
  font-size: 35px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

#whitespace {
    height: 60px;
}
</style>


  
  
  