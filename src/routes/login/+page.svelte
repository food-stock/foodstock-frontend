<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import BaseLayout from '../BaseLayout.svelte';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';

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
            console.error('Error during login:', error);
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
      <div id="username">{translate('Login.Username')}</div> <input id="ipt" type="text" name="username" bind:value={username}>
      <div id="password">{translate('Login.Password')}</div> <input id="ipt" type="password" name="password" bind:value={password}>
      {#if (errorB)}
        <p>{translate('Login.Error')}</p>
      {/if}
      <div id="final">
        <input id="btn" type="submit" value="Submit">
      </div>
        <a id="register" href="/register">{translate('Login.Register')}</a>
    </form>
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

  #ipt {
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
  }

  #picture {
    width: 300px;
    height: 300px;
  }

</style>
