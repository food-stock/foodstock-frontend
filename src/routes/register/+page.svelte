<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';
    import { identity } from 'svelte/internal';

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
  let error1 = false;
  let error2 = false;

  function validatePassword(password) {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  }

  async function handleSubmit() {
    let condition = validatePassword(password);
    error1 = false;
    error2 = false;
    if (!condition) {
      error1 = true;
      return;
    } 
    else if (password != password2) {
      error2 = true;
      return;
    } else {

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
      <input id="ip" type="text" bind:value={fname} required/>

    <div id="field">
      {translate('Register.LName')} :
    </div>
      <input  id="ip2" type="text" bind:value={lname} required/>

    <div id="field">
      {translate('Register.Username')} : 
    </div>
      <input id="ip3" type="text" bind:value={username} required/>

    <div id="field">
      {translate('Register.Email')} : 
    </div>
      <input  id="ip4" type="email" bind:value={email} required/>

    <div id="field">
      {translate('Register.Password')}
    </div>
      <div>
        <input  id="ip5" type="password" bind:value={password} required/>
        <span on:click={() => showPassword = !showPassword} style="cursor: pointer;">
          {@html showPassword ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>'}
        </span>
      </div>
      <div id="tips">
        {translate('Register.PasswordRequirements')}
      </div>
      
      {#if error1}
      <div class="notifications-container">
  <div class="error-alert">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="error-svg">
          <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
        </svg>
      </div>
      <div class="error-prompt-container">
        <p class="error-prompt-heading">{translate('Register.PasswordStrength')}</p>
        <div class="error-prompt-wrap">
          <ul class="error-prompt-list" role="list">
            <li>{translate('Register.PasswordRequirements')}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
    {/if}

    <div id="field">
      {translate('Register.ConfirmPassword')} 
    </div>
      <div>
        <input id="ip6" type="password" bind:value={password2} required/>
        <span on:click={() => showPassword2 = !showPassword2} style="cursor: pointer;">
          {@html showPassword2 ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>'}
        </span>
      </div>

    

      {#if error2}
      <div class="error-alert">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="error-svg">
              <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="error-prompt-container">
            <p class="error-prompt-heading">{translate('Register.PasswordMatch')}</p>
          </div>
        </div>
      </div>
      {/if}

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


  .notifications-container {
  width: 320px;
  height: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flex {
  display: flex;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.error-alert {
  border-radius: 0.375rem;
  padding: 1rem;
  background-color: rgb(254 242 242);
}

.error-svg {
  color: #F87171;
  width: 1.25rem;
  height: 1.25rem;
}

.error-prompt-heading {
  color: #991B1B;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: bold;
}

.error-prompt-container {
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
}

.error-prompt-wrap {
  margin-top: 0.5rem;
  color: #B91C1C;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.error-prompt-list {
  padding-left: 1.25rem;
  margin-top: 0.25rem;
  list-style-type: disc;
}

</style>
