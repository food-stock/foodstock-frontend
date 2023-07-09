<script lang='ts'>
  import { translate } from '../TranslationStore';
    import { goto } from '$app/navigation'; 
</script>

<main>
<div id="whitespace"></div>
<div id="container">
    <div id="title">{translate('Root.Title')}</div>
    <div id="sub">{translate("Root.Sub")}</div>
    <div id="cont-buttons">
        <button id ="bton" on:click={() => goto('/register')}>Register</button> 
        <button id="bton" on:click={() => goto('/login')}>Login</button>
    </div>
</div> 
</main>

<style> 
#container {
    margin: 0 auto;
    width: 50%;
    padding: 10px;
    text-align: center;
    justify-content: center;
    flex-direction: column;
}

#cont-buttons {
    display: inline-flex;
    flex-direction: column ;
}

#bton {
    text-decoration: none;
    border: none;
    background-color: var(--blue-color);
    margin : 10px;
}

#title {
    font-size: larger;
    margin: 20px;
}

#sub {
    font-size: large;
    margin: 20px;
}

#whitespace {
    height: 150px;
}
</style>