<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';

  let access_token = Cookies.get('access_token');

  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  let fname = '';
  let lname = '';
  let username = '';
  let email = '';
  let password = '';
  let password2 = '';
  let showPassword = false;
  let showPassword2 = false;
  let isRegistered = false;

  async function handleSubmit() {
    const dict = {
      'username': username,
      'email': email,
      'first_name': fname,
      'last_name': lname,
      'password': password,
    }
    const response = await fetch(`http://localhost:8000/register/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(dict)
    });

    if (response.status == 500) {
      console.error('Username already exists');
      return;
    } else {
      const data = await response.json();
      Cookies.set('username', username);
      Cookies.set('id', data.user_id);
      Cookies.set('locale', 'en');
      isRegistered = true;
    }
  }
</script>

<body>
<main>
<div id="container">
  <div id="maintitle">FoodStock</div>
  
  
  {#if isRegistered}
  <div id="subtitle">{translate('Register.Success')}</div>
  <a href="/login">{translate('Register.GoLogin')}</a>
  <img id="picture" src="/wolf.png" alt="Image" />
  {:else}
  <div id="subtitle">{translate('Register.Title')}</div>
  <a id="register" href="/login">{translate('Register.Login')}</a>
  <form on:submit={handleSubmit}>
    <div id="field">
      {translate('Register.FName')} :
    </div>
      <input id="ip" type="text" bind:value={fname} />

    <div id="field">
      {translate('Register.LName')} :
    </div>
      <input  id="ip2" type="text" bind:value={lname} />

    <div id="field">
      {translate('Register.Username')} : 
    </div>
      <input id="ip3" type="text" bind:value={username} />

    <div id="field">
      {translate('Register.Email')} : 
    </div>
      <input  id="ip4" type="email" bind:value={email} />

    <div id="field">
      {translate('Register.Password')}
    </div>
      <div>
        <input  id="ip5" type="password" bind:value={password} />
        <span on:click={() => showPassword = !showPassword} style="cursor: pointer;">
          {@html showPassword ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>'}
        </span>
      </div>
      <div id="tips">
        {translate('Register.PasswordRequirements')}
      </div>

    <div id="field">
      {translate('Register.ConfirmPassword')} 
    </div>
      <div>
        <input id="ip6" type="password" bind:value={password2} />
        <span on:click={() => showPassword2 = !showPassword2} style="cursor: pointer;">
          {@html showPassword2 ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>'}
        </span>
      </div>

    <button type="submit">{translate('Register.Register')}</button>
  </form>
  {/if}
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

  body {
    font-family: 'Ysabeau SC', sans-serif;
    background: linear-gradient(to bottom, var(--green-color), var(--beige-color));
    width: 100vw;
    height: 110vh;
  }

  #container {
    font-family: 'Ysabeau SC', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  input {
    margin-top: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid var(--grey-color);
    width: 200px;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: var(--green-color);
    border: none;
    color: var(--white-color);
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  #maintitle {
    font-size: 50px;
    font-weight: bold;
    color: var(--white-color);
    text-align: center;
    margin-top: 0px;
  }

  #subtitle {
    font-size: 25px;
    font-weight: bold;
    color: var(--white-color);
    text-align: center;
  }
  
  #picture {
    width: 350px;
    height: 350px;
  }

  #tips {
    font-size: 12px;
    color: var(--white-color);
  }

  #field {
    margin-top: 10px;
    font-size: 20px;
    color: var(--white-color);
  }

  #ip, #ip2, #ip3, #ip4, #ip5, #ip6 {
    margin-top: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid var(--grey-color);
    width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  #register {
    text-decoration: none;
    margin-top: 15px;
    font-size: 15px;
    font-weight: bold;
    color: var(--white-color);
  }

</style>
