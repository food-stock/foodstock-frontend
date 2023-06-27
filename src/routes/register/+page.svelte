<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';
  import { _} from 'svelte-i18n';

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
  let showPassword = false;

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
      goto('/login');
    }
  }
</script>

<BaseLayout>
<div id="container">
  <div id="maintitle">FoodStock</div>
  <div id="subtitle">{$_('Register.Title')}</div>
  <form on:submit={handleSubmit}>
    <label>
      {$_('Register.FName')} :
      <input type="text" bind:value={fname} />
    </label> <br>

    <label>
      {$_('Register.LName')} :
      <input type="text" bind:value={lname} />
    </label> <br>

    <label>
      {$_('Register.Username')} :
      <input type="text" bind:value={username} />
    </label> <br>

    <label>
      {$_('Register.Email')} :
      <input type="email" bind:value={email} />
    </label> <br>

    <label>
      {$_('Register.Password')}
      <div>
        <input type="password" bind:value={password} />
        <span on:click={() => showPassword = !showPassword} style="cursor: pointer;">
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      <small>
        {$_('Register.PasswordRequirements')}
      </small>
    </label> <br>

    <label>
      {$_('Register.ConfirmPassword')}
      <div>
        <input type="password" bind:value={password} />
        <span on:click={() => showPassword = !showPassword} style="cursor: pointer;">
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
    </label> <br>

    <button type="submit">{$_('Register.Register')}</button>
  </form>
</div>
</BaseLayout>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #3fb945, rgba(255, 255, 255, 1));
    height: 100vh;
  }

  input {
    margin-top: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 200px;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #3fb945;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
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
  
</style>
