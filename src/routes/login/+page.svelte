<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import BaseLayout from '../BaseLayout.svelte';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';
  import {auth} from '../../stores/auth';

  let username = '';
  let password = '';
  let errorB = false;

  async function handleSubmit() {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://127.0.0.1:8000/token/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
          const data2 = await response.json();
          Cookies.set('access_token', data2.access);
          Cookies.set('refresh_token', data2.refresh);
          Cookies.set('username', username);
          auth.set(true);

          const headers = {
            'Authorization': `JWT ${data2.access}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }

          const response2 = await fetch(`http://localhost:8000/get_user_id`, {
            method: 'GET',
            headers: headers
          });

          if (response2.ok) {
            const data = await response2.json();
            Cookies.set('id', data.id);
            goto('/stock');
          }
          else {
            console.error('Error during login:', errorB);
          }
      } else {
          console.error('Error during login');
          username = '';
          password = '';
          errorB = true;
      }
    } catch (error) {
        console.error('Error during login:', error);
        username = '';
        password = '';
        errorB = true;
    }
  }

  async function refreshToken() {
      const refresh_token = Cookies.get('refresh_token');
      const header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      const formData = new URLSearchParams();
      formData.append('refresh', refresh_token);
      const response = await fetch('http://localhost:8000/token/refresh/', {
        method: 'POST',
        headers: header,
        body: formData
      });
      const data = await response.json();
      Cookies.set('access_token', data.access);
  }
  
</script>

<body>
<main>
  <div id="container">
    <div id="maintitle">FoodStock</div>
    <div id="subtitle">{translate('Login.Title')}</div>
    <form on:submit={handleSubmit}>
      <div id="username">{translate('Login.Username')}</div> <input id="ipt" type="text" name="username" autocomplete="on" bind:value={username}>
      <div id="password">{translate('Login.Password')}</div> <input id="ipt2" type="password" name="password" bind:value={password}>
      {#if (errorB)}
        <div class="notifications-container">
    <div class="error-alert">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="error-svg">
            <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
          </svg>
        </div>
        <div class="error-prompt-container">
          <p class="error-prompt-heading">{translate('Login.Error')}</p>
          <div class="error-prompt-wrap">
            <ul class="error-prompt-list" role="list">
              <li>{translate('Login.PasswordStrength')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
      {/if}
      <div id="final">
        <input id="btn" type="submit" value="Submit">
      </div>
        <a id="register" href="/register">{translate('Login.Register')}</a>
    </form>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img id="picture" src="/wolf.png" alt="Image" />
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
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
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

  #ipt, #ipt2 {
    margin-top : 20px;
    border: none;
  }

  #username {
    font-size: 20px;
    font-weight: bold;
    color: var(--white-color);
    margin-top: 20px;
  }

  #password {
    font-size: 20px;
    font-weight: bold;
    color: var(--white-color);
    margin-top: 20px;
  }

  #btn {
    margin : 20px;
    text-align: center;
    background-color:var(--green-color);
    border: none;
    color: var(--white-color);
    padding: 15px 32px;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
  }

  #register {
    text-decoration: none;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: var(--white-color);
    flex-wrap: wrap;
  }

  #picture {
    width: 80vw;

  }


  .notifications-container {
  width: 320px;
  height: auto;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 10px;
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
