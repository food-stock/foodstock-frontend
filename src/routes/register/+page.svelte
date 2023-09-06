<script lang='ts'>
  import { translate } from '$lib/locales/TranslationStore';
  import { goto } from '$app/navigation';
  import Cookies from 'js-cookie';import headers from '$lib/requests/headers';
import constants from '$lib/constants';

  let name = '';
  let username = '';
  let email = '';
  let password = '';
  let password2 = '';
  let acceptedConditions : boolean = false;
  let isRegistered = false;
  let error1 = false;
  let error2 = false;

  function validatePassword(password:string) {
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  }

  async function handleSubmit(event : Event) {
    event.preventDefault();
    let condition = validatePassword(password);
    error1 = false;
    error2 = false;
    if (!condition) {
      error1 = true;
      return;
    } 
    else if (password != password2) {
      error2 = true;
      return;
    } else {

      const dict = {
      'username': username,
      'email': email,
      'first_name': name.split(' ')[0],
      'last_name': name.split(' ')[1],
      'password': password,
    }
    const response = await fetch(`${constants.ADD_API}register/`, {
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
      Cookies.set('locale', 'en');
      isRegistered = true;
    }
  }
  }
</script>

<body>
<main>
<div class="wrapper">
  <h2>FoodStock</h2>
  <form on:submit={handleSubmit}>
    <div class="input-box">
      <input type="text" placeholder="{translate('Register.FName')}" bind:value={name} required>
    </div>
    <div class="input-box">
      <input type="text" placeholder="ENTER YOUR {translate('Register.Username')}" bind:value={username} required>
    </div>
    <div class="input-box">
      <input type="text" placeholder="{translate('Register.Email')}" bind:value={email} required>
    </div>
    <div class="input-box">
      <input type="password" placeholder="{translate('Register.Password')}" bind:value={password} required>
    </div>
    {#if error1}
    <div class="notifications-container">
      <div class="error-alert">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="error-svg">
              <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
            </svg>
          </div>
          <div class="error-prompt-container">
            <p class="error-prompt-heading">{translate('Register.PasswordStrength')}</p>
            <div class="error-prompt-wrap">
              <ul class="error-prompt-list" role="list">
                <li>{translate('Register.PasswordRequirements')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/if}
    {#if error2}
    <div class="error-alert">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="error-svg">
            <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
          </svg>
        </div>
        <div class="error-prompt-container">
          <p class="error-prompt-heading">{translate('Register.PasswordMatch')}</p>
        </div>
      </div>
    </div>
    {/if}
    <div class="input-box">
      <input type="password" placeholder="{translate('Register.ConfirmPassword')}" bind:value={password2} required>
    </div>
    <div class="policy">
      <input type="checkbox" bind:value={acceptedConditions}>
      <h3>I accept all terms & condition</h3>
    </div>
    <div class="input-box button">
      <input type="Submit" value="{translate('Register.Register')}">
    </div>
    <div class="text">
      <h3>{translate('Register.Login')} <button on:click={()=>goto("/login")}>{translate("Register.BLogin")}</button></h3>
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
form .policy{
  display: flex;
  align-items: center;
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
form .text h3 button{
  color: var(--green-color);
  text-decoration: none;
}
form .text h3 button:hover{
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
