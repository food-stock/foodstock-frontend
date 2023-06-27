<script>
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';

  let registration;
  let isSubscribed = false;
  let subscription;

  let access_token = Cookies.get('access_token');
  let id = Cookies.get('id');

  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const PUBLIC_VAPID_KEY = "BKjHSBAs0BFqGPsqYP34-y1rX-zJMZHUZEuQ8mEXK0dMhJ19LBEh8hP46F_-aH-XFHuFrlcxf5HkwLN2nE6Hba4";

  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration()
        .then((reg) => {
          registration = reg;
          checkSubscription();
        })
        .catch((error) => {
          console.error('Error while getting service worker registration:', error);
        });
    } else {
      console.warn('Service workers are not supported in your browser.');
    }
  });

  function checkSubscription() {
    registration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          isSubscribed = true;
        } else {
          isSubscribed = false;
        }
      })
      .catch((error) => {
        console.error('Error while checking subscription:', error);
      });
  }

  async function subscribe() {
  const options = {
    userVisibleOnly: true,
    applicationServerKey: PUBLIC_VAPID_KEY,
  };

  try {
    let subscription = await registration.pushManager.subscribe(options);
    subscription = JSON.parse(JSON.stringify(subscription));
    const encodedEndpoint = encodeURIComponent(subscription.endpoint);
    const encodedP256dh = encodeURIComponent(subscription.keys.p256dh);
    const encodedAuth = encodeURIComponent(subscription.keys.auth);
    isSubscribed = true;

    const data = await fetch(`http://127.0.0.1:8000/register_subscription/?endpoint=${encodedEndpoint}&p256dh=${encodedP256dh}&auth=${encodedAuth}`, {
      method: 'POST',
      headers: headers,
    });
    const response = await data.json();
    console.log(response);
  } catch (error) {
    console.error('Error while subscribing or sending subscription to the server:', error);
  }
}


  function unsubscribe() {
    registration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          subscription.unsubscribe()
            .then(() => {
              isSubscribed = false;
            })
            .catch((error) => {
              console.error('Error while unsubscribing:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error while checking subscription:', error);
      });
  }
</script>

<main>
  <h1>Push Notifications</h1>

  {#if isSubscribed}
    <p>You are subscribed to push notifications.</p>
    <button on:click={unsubscribe}>Unsubscribe</button>
  {:else}
    <p>You are not subscribed to push notifications.</p>
    <button on:click={subscribe}>Subscribe</button>
  {/if}
</main>

<style>
  h1 {
    color: #3fb945;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  p, code {
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #3fb945;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
</style>
