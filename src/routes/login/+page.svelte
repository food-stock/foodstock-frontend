<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';
  import { _ } from 'svelte-i18n';

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

<BaseLayout>
  <div id="container">
    <div id="maintitle">FoodStock</div>
    <div id="subtitle">{$_('Login.Title')}</div>
    <form on:submit={handleSubmit}>
      <div id="username">{$_('Login.Username')}</div> <input id="ipt" type="text" name="username" bind:value={username}>
      <div id="password">{$_('Login.Password')}</div> <input id="ipt" type="password" name="password" bind:value={password}>
      {#if (errorB)}
        <p>{$_('Login.Error')}</p>
      {/if}
      <div id="final">
        <input id="btn" type="submit" value="Submit">
      </div>
    </form>
  </div>
</BaseLayout>

<style>
  #container {
    background: linear-gradient(to bottom, var(--green-color), rgba(255, 255, 255, 1));
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  #maintitle {
    font-size: 50px;
    font-weight: bold;
    color: white;
    text-align: center;
    margin-top: 50px;
  }

  #subtitle {
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-align: center;
    margin-top: 50px;
  }

  #ipt {
    margin-top : 20px;
    border: none;
  }

  #username {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-top: 50px;
  }

  #password {
    font-size: 20px;
    font-weight: bold;
    color: white;
    margin-top: 50px;
  }

  #btn {
    margin : 20px;
    text-align: center;
    background-color:var(--green-color);
    border: none;
    color: white;
    padding: 15px 32px;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
  }


</style>
