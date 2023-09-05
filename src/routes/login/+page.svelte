<script lang='ts'>
  import { translate } from '$lib/locales/TranslationStore';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';import headers from '$lib/requests/headers';
  import {auth} from '../../lib/stores/auth';

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
  <div class="wrapper">
    <h2>FoodStock</h2>
    <form on:submit={handleSubmit}>
      <div class="input-box">
        <input type="text" placeholder="ENTER YOUR {translate('Register.Username')}" bind:value={username} required>
      </div>
      <div class="input-box">
        <input type="password" placeholder="{translate('Register.Password')}" bind:value={password} required>
      </div>
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
      <div class="input-box button">
        <input type="Submit" value="{translate('Register.Register')}">
      </div>
      <div class="text">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <h3>{translate('Login.Register')} <a on:click={()=>goto("/register")}>{translate("Login.BRegister")}</a></h3>
      </div>
    </form>
  </div>
  
  </main>
  </body>
  
  <style>
  
    @import '@fortawesome/fontawesome-free/css/all.css';
    @import url('https://fonts.googleapis.com/css2?family=Ysabeau+SC:wght@1;200&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
  
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--green-color);
  }
  .wrapper{
    position: relative;
    max-width: 430px;
    width: 100%;
    background: #fff;
    padding: 34px;
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }
  .wrapper h2{
    position: relative;
    font-size: 22px;
    font-weight: 600;
    color: #333;
  }
  .wrapper h2::before{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 28px;
    border-radius: 12px;
    background: var(--green-color);
  }
  .wrapper form{
    margin-top: 30px;
  }
  .wrapper form .input-box{
    height: 52px;
    margin: 18px 0;
  }
  form .input-box input{
    height: 100%;
    width: 100%;
    outline: none;
    padding: 0 15px;
    font-size: 17px;
    font-weight: 400;
    color: #333;
    border: 1.5px solid #C7BEBE;
    border-bottom-width: 2.5px;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  .input-box input:focus,
  .input-box input:valid{
    border-color: var(--green-color);
  }  
  form h3{
    color: #707070;
    font-size: 14px;
    font-weight: 500;
    margin-left: 10px;
  }
  .input-box.button input{
    color: #fff;
    letter-spacing: 1px;
    border: none;
    background: var(--green-color);
    cursor: pointer;
  }
  .input-box.button input:hover{
    background: var(--green-color);
  }
  form .text h3{
   color: #333;
   width: 100%;
   text-align: center;
  }
  form .text h3 a{
    color: var(--green-color);
    text-decoration: none;
  }
  form .text h3 a:hover{
    text-decoration: underline;
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
  