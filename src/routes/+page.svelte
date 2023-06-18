<script>
import { onMount } from 'svelte';
import { goto } from '$app/navigation'; 
let isRegistered = false;
let message = "";
if (isRegistered) {
    message = 'Welcome to the home page \n ' + localStorage.getItem('username');
} else {
    message = "You are not connected, please register or login"
}
</script>

<div id="container">
{message} <br>
<button on:click={() => goto('/register')}>Register</button>  <br>
<button on:click={() => goto('/login')}>Login</button>
</div> 

<style> 
#container {
    margin: 0 auto;
    width: 50%;
    border: 3px solid green;
    padding: 10px;
    text-align: center;
}
</style>