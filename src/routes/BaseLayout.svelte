<script lang="ts">
    // Import translations
    import { loadTranslations, translate } from '../TranslationStore';
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import {auth} from '../stores/auth';

    let authLocal: boolean = false ;

    auth.subscribe(a => {
        authLocal = a;
    });
  
    import Cookies from 'js-cookie';

    let user = Cookies.get('username');
  
    
    let isMenuVisible = false;
  
    function toggleMenu() {
      isMenuVisible = !isMenuVisible;
    }
  
    function toggleDarkMode() {
      window.document.body.classList.toggle('dark-mode');
    }

    onMount(() => {
        if (authLocal) {
            loadTranslations;
        } else {
            //goto('/login');
        }
    });
  </script>
  


<div class="menu" class:visible={isMenuVisible}>
    <button id="bttonX" on:click={toggleMenu}>
        <i class="fa-solid fa-xmark"></i>
    </button>
    <a id="bder" href="/stock">
        <i class="fa-solid fa-house"></i> Home
    </a> <br>
    <a id="bder" href="/settings">
        <i class="fa-solid fa-heart"></i> Social
    </a> <br>
    <a id="bder" href="/settings">
        <i class="fa-solid fa-gear"></i> Settings
    </a> <br>
    <a id="bder" href="/notifications">
        <i class="fa-solid fa-bell"></i> Notifications
    </a> <br>
    <a id="bder" href="/settings">
        <i class="fa-solid fa-money-bill"></i> Support us
    </a> <br>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a id="cat-link" on:click={toggleDarkMode}>
        <i class="fa-solid fa-moon"></i> {translate('Settings.DarkMode')} 
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

<header>
    <div id="header">
        <button id="bttonL" on:click={toggleMenu}><i class="fa-solid fa-bars"></i></button>
        {translate('BaseLayout.Hi')}, {user}
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
    @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');
    
    .menu {
        position: fixed;
        height: 100vh;
        width: 70vw;
        top: 0;
        left: 0;
        background-color: var(--green-color);
        color: var(--white-color);
        z-index: 6;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        transform: translateX(-100%);
        transition: transform 0.3s;
    }
    
    .menu.visible {
        transform: translateX(0%);
    }
    
    #bder {
        padding: 20px;
        text-align: center;
        font-size: 20px;
        justify-content: center;
        color: var(--white-color);
        text-decoration: none;
        margin: 10px;
    }
    
    main {
        margin: 0;
        overflow: hidden;
        /* font-family: 'Oswald', sans-serif;*/
    }
    
    :global(:root) {
        --green-color: #3fb945;
        --blue-color : #0084f6;
        --red-color: #f44336;
        --yellow-color: #ffeb3b;
        --orange-color: #ff9800;
        --purple-color: #9c27b0;
        --dark-color : #1d3040;
        --grey-color: #bfc2c7;
        --beige-color :  #f2eee2;
        --white-color : #ffffff;
    }
    
    :global(body) {
        background-color: var(--beige-color);
        color : var(--dark-color);
        transition: background-color 0.3s;
        font-family: 'Ysabeau SC', sans-serif;
    }
    
    :global(body.dark-mode) {
        background-color: var(--dark-color);
        color: var(--grey-color);
    }
    
    #header {
        color: black;
        background-color: var(--green-color);
        position: fixed;
        top: 0;
        left: 0;
        width: 95vw;
        height: 30px;
        padding: 10px;
        text-align: center;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        justify-content: center;
    }
    
    #icon_search {
        float: right; 
        text-align: center;
        text-decoration: none;
        color: black;
    }
    
    #btton,
    #bttonL,
    #bttonX {
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
    
    #bttonX {
        position: fixed;
        top: 0;
        left: 0;
        margin-left: 4px;
        font-size: 35px;
    }
    
    #bttonA {
        width: 60px;
        height: 60px;
        border-radius: 40px;
        color: var(--green-color);
        border: none;
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
        color: var(--green-color);
        border: none;
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
        color: var(--green-color);
        border: none;
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
        background-color:  var(--blue-color);
        color: var(--white-color);
    }
    
    :global(body.dark-mode) #bttonH {
        background-color: var(--blue-color);
        color: var(--white-color);
    }
    
    :global(body.dark-mode) #bttonA {
        background-color: var(--blue-color);
        color: var(--white-color);
    }
    
    :global(body.dark-mode) #btton {
        color: var(--white-color);
    }
    
    :global(body.dark-mode) #bttonL {
        color: var(--white-color);
    }
    
    </style>