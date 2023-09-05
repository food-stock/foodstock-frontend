<script lang="ts">
    import { goto } from "$app/navigation";
    import { translate } from "$lib/locales/TranslationStore";
    import Cookies from 'js-cookie';

    let isMenuVisible = false;
    let user = Cookies.get('username');

    function go(link:string) {
        isMenuVisible = !isMenuVisible;
        goto(link);
    }    
      
    function toggleMenu() {
      isMenuVisible = !isMenuVisible;
    }

    function toggleDarkMode() {
      window.document.body.classList.toggle('dark-mode');
    }

</script>

<div class="menu" class:visible={isMenuVisible}>
    <button id="bttonX" on:click={toggleMenu}>
        <i class="fa-solid fa-xmark"></i>
    </button>
    <button id="bder" on:click={()=>go("/stock")}>
        <i class="fa-solid fa-house"></i> Home
    </button>
    <button id="bder" on:click={()=>go("/settings")}>
        <i class="fa-solid fa-heart"></i> Social
    </button>
    <button id="bder" on:click={()=>go("/settings")}>
        <i class="fa-solid fa-gear"></i> Settings
    </button>
    <button id="bder" on:click={()=>go("/notifications")}>
        <i class="fa-solid fa-bell"></i> Notifications
    </button>
    <button id="bder" on:click={()=>go("/settings")}>
        <i class="fa-solid fa-money-bill"></i> Support us
    </button>
    <button id="bder" on:click={toggleDarkMode}>
        <i class="fa-solid fa-moon"></i> {translate('Settings.DarkMode')} 
    </button>
</div>

<header>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div id="header">
        <button id="bttonL" on:click={toggleMenu}><i class="fa-solid fa-bars"></i></button>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={()=>goto("/stock")}>{translate('BaseLayout.Hi')}, {user}</span>
        <button id="btton" on:click={()=>goto("/search")}><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
</header>


<style>   
    button {
        background-color: transparent;
        border: none;
        color : var(--white-color);
    }
        
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
        border-radius: 20px 20px 20px 0;
    }

    .menu.visible {
        transform: translateX(0%);
    }

    span {
        cursor: pointer;
    }

    #bder {
        padding: 20px;
        text-align: center;
        font-size: 20px;
        justify-content: center;
        color: var(--white-color);
        text-decoration: none;
        margin: 10px;
        cursor: pointer;
    }

    #header {
        color: var(--white-color);
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
        border-radius: 0 0 10px 0;
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

    @media (min-width: 768px) {
        button {
            background-color: transparent;
            border: none;
            color : var(--white-color);
        }
            
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
            border-radius: 20px 20px 20px 0;
        }
        
        .menu.visible {
            transform: translateX(0%);
        }

        span {
            cursor: pointer;
        }
        
        #bder {
            padding: 20px;
            text-align: center;
            font-size: 20px;
            justify-content: center;
            color: var(--white-color);
            text-decoration: none;
            margin: 10px;
            cursor: pointer;
        }

        #header {
            color: var(--white-color);
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
            border-radius: 0 0 10px 0;
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
    }

    :global(body.dark-mode) button {
        background-color:  var(--blue-color);
        color: var(--black-color);
    }

    :global(body.dark-mode) .menu {
        background-color:  var(--blue-color);
        color: var(--black-color);
    }
    
    :global(body.dark-mode) #header {
        background-color:  var(--blue-color);
        color: var(--black-color);
    }

    :global(body.dark-mode) #bder {
        background-color:  var(--blue-color);
        color: var(--black-color);
    }

    :global(body.dark-mode) #bttonL {
        background-color: var(--blue-color);
        color: var(--black-color);
    }

    :global(body.dark-mode) #bttonX {
        background-color: var(--blue-color);
        color: var(--black-color);
    }

    :global(body.dark-mode) #btton {
        background-color: var(--blue-color);
        color: var(--black-color);
    }
</style>