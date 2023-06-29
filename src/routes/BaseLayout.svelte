<script>
    //export const ssr = false; 
    import Cookies from 'js-cookie';
    let user = Cookies.get('username');

    import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

    register('fr', () => import('../locales/fr.json'));
    register('en', () => import('../locales/en.json'));

    init({
    fallbackLocale: 'en',
    initialLocale: 'en',
    });

    import { _} from 'svelte-i18n'

    import { locale } from 'svelte-i18n';
    locale.set('en');

</script>

<a href="/scanproduct">
    <button id="bttonB"><i class="fa-solid fa-barcode"></i></button>
</a>
<a href="/add">
    <button id="bttonA"><i class="fa-solid fa-plus"></i></button>
</a>
<a href="/stock">
    <button id="bttonH"><i class="fa-solid fa-home"></i></button>
</a>

<!--<i class="fa-solid fa-gear"></i>-->
<header>
    <div id="header">
        <a href="/settings">
            <button id="bttonL"><i class="fa-solid fa-bars"></i></button>
        </a>
        {$_('BaseLayout.Hi')}, {user}
        <a href="/search">
            <button id="btton"><i id="icon_search" class="fa-solid fa-magnifying-glass"></i></button>
        </a>
    </div>
</header>

<div class="container">
    <div id="whitespace2"></div>
<main>
    <slot></slot>
</main>
  
<footer>
    <div id="whitespace"></div>
</footer>

</div>

<style>

@import '@fortawesome/fontawesome-free/css/all.css';

main {
    margin : 0;
    overflow: hidden;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#header {
    color: black;
    background-color: #3fb945;
    position : fixed;
    top : 0;
    left: 0;
    width: 95vw;
    padding: 10px;
    text-align: center;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    justify-content: center;
}

#icon_search {
    float: right; /* Float the search element to the right */
    text-align: center;
    text-decoration: none;
    color: black;
}

#btton , #bttonL{
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
#bttonL {
  float: left;
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

#bttonB {
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
    bottom: 135px; 
    right: 10px;
    font-size: 35px;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

#whitespace {
    height: 60px;
}

#whitespace2 {
    height: 40px;
}
</style>


  
  
  