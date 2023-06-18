<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';

  let username = '';
  let password = '';

  async function handleSubmit() {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', '');
      formData.append('username', username);
      formData.append('password', password);
      formData.append('scope', '');
      formData.append('client_id', '');
      formData.append('client_secret', '');

      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        const data2 = await response.json();
        Cookies.set('access_token', data2.access_token);
        Cookies.set('username', username);
        const data = data2.user;
        Cookies.set('id', data.id);
        Cookies.set('fname', data.fname);
        Cookies.set('lname', data.lname);
        Cookies.set('email', data.email);
        Cookies.set('dob', data.dob);
        goto('/stock');
      } else {
        const error = await response.json();
        console.error('Error during login:', error);
        // Réinitialiser les champs de texte
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
