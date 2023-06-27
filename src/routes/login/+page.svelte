<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';
  import { _ } from 'svelte-i18n';

  let refresh_token = Cookies.get('refresh_token');

  let access_token = Cookies.get('access_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  let username = '';
  let password = '';
  let errorB = false;

  async function handleSubmit() {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/token/', {
        method: 'POST',
        headers: headers,
        body: formData
      });

      if (response.ok) {
          const data2 = await response.json();
          Cookies.set('access_token', data2.access);
          Cookies.set('refresh_token', data2.refresh);
          Cookies.set('username', username);

          const response2 = await fetch(`http://localhost:8000/user/${username}/`, {
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
          const error = await response.json();
          console.error('Error during login:', error);
          username = '';
          password = '';
          errorB = true;
      }
    } catch (error) {
        console.error('Error during login:', error);
    }
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
    background: linear-gradient(to bottom, #3fb945, rgba(255, 255, 255, 1));
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
    background-color: #3fb945;
    border: none;
    color: white;
    padding: 15px 32px;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
  }


</style>
