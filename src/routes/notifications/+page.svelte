<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import BaseLayout from '../BaseLayout.svelte';
  import { onMount } from 'svelte';
  import Cookies from 'js-cookie';
  import { VAPID_PUBLIC_KEY } from '$lib/constants';

  let registration;
  let isSubscribed = false;
  let subscription;
  let push = [];

  let access_token = Cookies.get('access_token');
  let id = Cookies.get('id');

  const headers = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

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
    if (!isSubscribed) {
      getLatestPush();
    }
  });

  async function getLatestPush() {
    const response = await fetch(`http://127.0.0.1:8000/get_latest_webpush/${id}/`, {
      method: 'POST',
      headers: headers,
    });
    const data = await response.json();
    push = data.push;
  }

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
    applicationServerKey: VAPID_PUBLIC_KEY,
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
  } catch (error) {
    console.error('Error while subscribing or sending subscription to the server:', error);
  }
}

async function testSubscription() {
    const response = await fetch(`http://127.0.0.1:8000/test_notif/`, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    if (data.message !== 'ok') {
      alert('Error while sending notification.');
    }
}


  function unsubscribe() {
    registration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          const encodedEndpoint = encodeURIComponent(subscription.endpoint);
          subscription.unsubscribe()
            .then(async () => {
              isSubscribed = false;
              try {
                  const data = await fetch(`http://127.0.0.1:8000/remove_subscription/?endpoint=${encodedEndpoint}`, {
                    method: 'POST',
                    headers: headers,
                  });
                  const response = await data.json();
                } catch (error) {
                  console.error('Error while subscribing or sending subscription to the server:', error);
                }
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

<BaseLayout>
  <h1>Push Notifications</h1>

  {#if isSubscribed}
    <p>You are subscribed to push notifications.</p>
    <button on:click={unsubscribe}>Unsubscribe</button>
    <button on:click={testSubscription}>Test subscription</button>

    <p>Your latest notifications</p>
    {#each push as notification}
    <div id="ndate">{notification.date}</div>
    <div id="ncontainer">
      <div id="ntitle">{notification.title}</div>
      <div id="nbody">{notification.body}</div>
    </div>
    {/each}
  {:else}
    <p>You are not subscribed to push notifications.</p>
    <button on:click={subscribe}>Subscribe</button>
  {/if}
</BaseLayout>

<style>
  h1 {
    color: var(--green-color);
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
    background-color: var(--green-color);
    color: var(--white-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }

  #ncontainer {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
  }

  #ntitle {
    font-weight: bold;
    font-size: 20px;
  }

  #nbody {
    font-size: 15px;
  }

  #ndate {
    font-size: 10px;
  }
</style>
