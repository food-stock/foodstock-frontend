<script lang="ts">
    import { loadTranslations, translate } from '$lib/locales/TranslationStore';
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import {auth} from '$lib/stores/auth';
    import {page} from '$app/stores';
    import headers from '$lib/requests/headers';
    import constants from '$lib/constants';
    import SideBar from '$lib/nav/SideBar.svelte';
    import Cookies from 'js-cookie';
    import PopUpCookies from '$lib/notifications/PopUpCookies.svelte';
    import Toasts from '$lib/notifications/Toasts.svelte';

    let authLocal: boolean = false ;
    let askCookies: boolean;

    auth.subscribe((a: boolean) => {
        authLocal = a;
    });
  
    async function refreshToken() {
        const refresh_token = Cookies.get('refresh_token');
        if (refresh_token === undefined) {
            return;
        }
        const formData = new URLSearchParams();
        formData.append('refresh', refresh_token);
        const response = await fetch(`${constants.ADD_API}tokenrefresh/`, {
            method: 'POST',
            headers: headers,
            body: formData
        });

        if (response.status === 401) {
            return;
        }

        const data = await response.json();
        Cookies.set('access_token', data.access);
    }

    onMount(() => {
        console.log(Cookies.get('cookiesaccepted'));
        if (Cookies.get('cookiesaccepted')==undefined) {
            askCookies = true;
        } else {
            askCookies = false;
        }

        if ($page.url.pathname === '/login' || $page.url.pathname === '/register'){
            return;
        }
        if (authLocal) {
            loadTranslations;
        } else {
            const user = Cookies.get('id');
            const token = Cookies.get('access_token');
            if (user === undefined || token === undefined) {
                return;
            }
            const req = fetch(`${constants.ADD_API}test_token/?user_id=${user}`, {
                headers: headers,
                method: 'POST'
            });
            req.then(async (res) => {
                if (res.status !== 200) {
                    console.log('Token expired');
                    await refreshToken();
                }
            });
        }
    });
  </script>

<Toasts />
  
<PopUpCookies bind:showPopup={askCookies} />

{#if $page.url.pathname === '/login' || $page.url.pathname === '/register' || $page.url.pathname === '/'}
<slot></slot>
{:else}
<SideBar />
<button on:click={()=>goto("/scanproduct")} id="bttonB"><i class="fa-solid fa-barcode"></i></button>
<button on:click={()=>goto("/add")} id="bttonA"><i class="fa-solid fa-plus"></i></button>
<button on:click={()=>goto("/stock")} id="bttonH"><i class="fa-solid fa-home"></i></button>

<div class="container">
    <div id="whitespace2"></div>
    <main>
        <slot></slot>
    </main>
  
    <footer>
        <div id="whitespace"></div>
    </footer>
</div>
{/if}

<style>
    @import '@fortawesome/fontawesome-free/css/all.css';
    @import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

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
        --black-color : #000000;
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

    button {
        background-color: transparent;
        border : none;
    }

    #bttonA, #bttonH, #bttonB {
        width: 60px;
        height: 60px;
        border-radius: 40px;
        color: var(--white-color);
        background-color: var(--green-color);
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        position: fixed; 
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    }
    
    #bttonA {
        bottom: 70px; 
        right: 10px;
        font-size: 30px;
    }
    
    #bttonH {
        bottom: 5px; 
        right: 10px;
        font-size: 25px;
    }
    
    #bttonB {
        bottom: 135px; 
        right: 10px;
        font-size: 25px;
    }
    
    #whitespace {
        height: 60px;
    }
    
    #whitespace2 {
        height: 40px;
    }

    :global(body.dark-mode) #bttonB {
        background-color: var(--blue-color);
        color: var(--black-color);
    }
    
    :global(body.dark-mode) #bttonH {
        background-color: var(--blue-color);
        color: var(--black-color);
    }
    
    :global(body.dark-mode) #bttonA {
        background-color: var(--blue-color);
        background-color: var(--blue-color);
        color: var(--black-color);
    }

    :global(button){
        background-color: transparent;
        border : none;
    }
    
    </style>