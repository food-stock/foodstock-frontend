<script lang='ts'>
  import { translate } from '../TranslationStore';
    import { goto } from '$app/navigation'; 
</script>

<body>
    <main>
        <div id="container">
            <div id="maintitle">{translate('Root.Title')}</div>
            <div id="subtitle">{translate("Root.Sub")}</div>
            <div id="cont-buttons">
                <button id ="bton" on:click={() => goto('/register')}>Register</button> 
                <button id="bton" on:click={() => goto('/login')}>Login</button>
            </div>
        </div> 
    </main>
</body>

<style> 
  @import '@fortawesome/fontawesome-free/css/all.css';
  @import url('https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@1;200&display=swap');
  
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

    #maintitle {
    font-size: 50px;
    font-weight: bold;
    color: var(--white-color);
    text-align: center;
  }

  #subtitle {
    font-size: 25px;
    font-weight: bold;
    color: var(--white-color);
    text-align: center;
  }

main {
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Ysabeau SC', sans-serif;
    background: linear-gradient(to bottom, var(--green-color), var(--beige-color));
    width: 100vw;
    height: 110vh;
  }

#container {
    text-align: center;
    justify-content: center;
    flex-direction: column;
    width: 110vw;
    height: 110vh;;
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
    padding: 10px;
    border-radius: 15px;
}
</style>