<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';

  let access_token = Cookies.get('access_token');
  let refresh_token = Cookies.get('refresh_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  let username = '';
  let password = '';

  async function handleSubmit() {
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        const data2 = await response.json();
        Cookies.set('access_token', data2.access);
        Cookies.set('refresh_token', data2.refresh);
        Cookies.set('username', username);
        Cookies.set('id', 1);
        goto('/stock');
      } else {
        const error = await response.json();
        console.error('Error during login:', error);
        username = '';
        password = '';
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
</script>

<BaseLayout>
  <div id="container">
    <form on:submit={handleSubmit}>
      Username: <input type="text" name="username" bind:value={username}><br>
      Password: <input type="password" name="password" bind:value={password}><br>
      <input type="submit" value="Submit">
    </form>
  </div>
</BaseLayout>
