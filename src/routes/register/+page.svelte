<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; 
  import Cookies from 'js-cookie';

  let access_token = Cookies.get('access_token');
  let refresh_token = Cookies.get('refresh_token');
  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
  let fname = '';
  let lname = '';
  let username = '';
  let email = '';
  let dob = '';
  let password = '';

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( dict)
    });

    if (response.status == 500) {
        console.error('Username already exists');
        return;
    } else {
      const data = await response.json();
      Cookies.set('username', username);
      Cookies.set('id', data.user_id);
      goto('/login');
    } 

  }
</script>

    <div id="container">
        <form on:submit={handleSubmit}>
            <label>
              First Name:
              <input type="text" bind:value={fname} />
            </label> <br>
          
            <label>
              Last Name:
              <input type="text" bind:value={lname} />
            </label> <br>
          
            <label>
              Username:
              <input type="text" bind:value={username} />
            </label> <br>
          
            <label>
              Email:
              <input type="email" bind:value={email} />
            </label> <br>
          
            <!--
            <label>
              Date of Birth:
              <input type="date" bind:value={dob} />
            </label> <br>
            -->
          
            <label>
              Password:
              <input type="password" bind:value={password} />
            </label> <br>
          
            <button type="submit">Register</button>
          </form>      
    </div>

<style>
    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>