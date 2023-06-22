<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation'; 
  import Cookies from 'js-cookie';
  let fname = '';
  let lname = '';
  let username = '';
  let email = '';
  let dob = '';
  let password = '';

  async function handleSubmit() {
    const response = await fetch(`http://localhost:8000/user?password=${password}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( { fname, lname, dob , email, username})
    });

    if (response.ok) {
      const data = await response.json();
      Cookies.set('isRegistered', 'true');
      Cookies.set('username', username);
      Cookies.set('id', data.id);
      Cookies.set('fname', fname);
      Cookies.set('lname', lname);
      Cookies.set('email', email);
      Cookies.set('dob', dob);
      goto('/mailconfirm');
    } else {
      console.error('Failed to create user');
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
          
            <label>
              Date of Birth:
              <input type="date" bind:value={dob} />
            </label> <br>
          
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