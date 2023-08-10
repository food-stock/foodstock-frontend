<script lang='ts'>
  import { translate } from '../TranslationStore';
    import { goto } from '$app/navigation'; 
</script>

<body>
    <main>
        <div id="container">
            <div class="el" id="maintitle">{translate('Root.Title')}</div>
            <div class="el" id="subtitle">{translate("Root.Sub")}</div>
            <div class="el" id="cont-buttons">
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

  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body{
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--green-color);
  font-family: 'Ysabeau SC', sans-serif;
}

.el {
  margin : 10px;
}

main {
    margin: 0;
    padding: 0;
}

  #maintitle {
    font-size: 50px;
    font-weight: bold;
    color: var(--white-color);
    text-align: center;
  }

  #subtitle {
    font-size: 25px;
    color: var(--white-color);
    text-align: center;
    width: 400px;
    font-weight: 400;
  }

#container {
    margin-top: -150px ;
    position: relative;
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
    background-color: var(--white-color);
    margin : 20px;
    padding: 40px;
    border-radius: 5px;
    font-size: 30px;
    color : var(--green-color)
}
</style>