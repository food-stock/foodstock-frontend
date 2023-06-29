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

    
  function toggle() {
        window.document.body.classList.toggle('dark-mode')
    }

</script>

<div class="menu">
    <button style="position:fixed;top:0;left:0;"><i class="fa-solid fa-xmark"></i></button>
    <a id="bder" href="/settings">
        <i class="fa-solid fa-heart"></i> Social
    </a> <br>
    <a id="bder"  href="/settings">
        <i class="fa-solid fa-money-bill"></i>Support us
    </a> <br>
    <a id="bder" href="/settings">
        <i class="fa-duotone fa-gear"></i> Settings
    </a> <br>
    
    <a id="cat-link" on:click={toggle}>
        <i class="fa-solid fa-moon"></i>{$_('Settings.DarkMode')} 
    </a>
</div>
  
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

.menu {
    position : fixed;
    height: 100vh;
    width: 70vw;
    top : 0;
    left: 0;
    background-color: #0084f6;
    color : white;
    z-index : 1;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

#bder {
    padding: 20px;
    text-align: center;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    justify-content: center;
    color : white;
    text-decoration: none;
    margin : 10px;
}

main {
    margin : 0;
    overflow: hidden;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

:global(:root){
       --green-color: #3fb945
    }

:global(body) {
		background-color: #f2eee2;
		color: #0084f6;
		transition: background-color 0.3s
	}

:global(body.dark-mode) {
		background-color: #1d3040;
		color: #bfc2c7;
	}

#header {
    color: black;
    background-color: var(--green-color);
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
  color: var(--green-color) ;
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
  color: var(--green-color) ;
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
    color: var(--green-color) ;
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

:global(body.dark-mode) #bttonB {
    background-color: #0084f6;
    color : white;
}

:global(body.dark-mode) #bttonH {
    background-color: #0084f6;
    color : white;
}

:global(body.dark-mode) #bttonA {
    background-color: #0084f6;
    color : white;
}

:global(body.dark-mode) #btton {
    color: white;
}

:global(body.dark-mode)  #bttonL {
    color: white;
}

</style>


  
  
  