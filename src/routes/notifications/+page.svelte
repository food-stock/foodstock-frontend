<script>
  import BaseLayout from '../BaseLayout.svelte';
  import Cookies from 'js-cookie';
  import {goto} from '$app/navigation';
  import { _} from 'svelte-i18n'
  import {onMount} from "svelte";

  let access_token = Cookies.get('access_token');
  let id = Cookies.get('id');
  let isSuscribed = false;

let isPushEnabled = false;
let registration;
let subBtn;

onMount(() => {
  subBtn = document.getElementById('webpush-subscribe-button');

  subBtn.addEventListener('click', () => {
    subBtn.disabled = true;
    if (isPushEnabled) {
      return unsubscribe(registration);
    }
    return subscribe(registration);
  })

  if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    console.log(document.querySelector('meta[name="service-worker-js"]'));
      const serviceWorker = document.querySelector('meta[name="service-worker-js"]').content;
      navigator.serviceWorker.register(serviceWorker).then((reg) => {
        registration = reg;
        initialiseState(reg);
      }).catch((error) => {
        console.error('Error while registering service worker:', error);
      });
    } else {
      showMessage('Service workers are not supported in your browser.');
    }
  });


function showMessage(message) {
  const messageBox = document.getElementById('webpush-message');
  if (messageBox) {
    messageBox.textContent = message;
    messageBox.style.display = 'block';
  }
}

function initialiseState(reg) {
  if (!(reg.showNotification)) {
    subBtn.textContent = 'Subscribe to Push Messaging';
    showMessage('Showing notifications are not supported in your browser.');
    return;
  }

  if (Notification.permission === 'denied') {
    subBtn.textContent = 'Subscribe to Push Messaging';
    subBtn.disabled = false;
    showMessage('Push notifications are blocked by your browser.');
    return;
  }

  if (!('PushManager' in window)) {
    subBtn.textContent = 'Subscribe to Push Messaging';
    subBtn.disabled = false;
    showMessage('Push notifications are not available in your browser.');
    return;
  }

  reg.pushManager.getSubscription().then((subscription) => {
    if (subscription) {
      postSubscribeObj('subscribe', subscription, (response) => {
        if (response.status === 201) {
          subBtn.textContent = 'Unsubscribe from Push Messaging';
          subBtn.disabled = false;
          isPushEnabled = true;
          showMessage('Successfully subscribed to push notifications.');
        }
      });
    }
  });
}

function subscribe(reg) {
  reg.pushManager.getSubscription().then((subscription) => {
    let metaObj, applicationServerKey, options;

    if (subscription) {
      return subscription;
    }

    metaObj = document.querySelector('meta[name="django-webpush-vapid-key"]');
    applicationServerKey = metaObj.content;
    options = {
      userVisibleOnly: true
    };
    if (applicationServerKey) {
      options.applicationServerKey = urlB64ToUint8Array(applicationServerKey)
    }

    reg.pushManager.subscribe(options)
      .then((subscription) => {
        postSubscribeObj('subscribe', subscription, (response) => {
          if (response.status === 201) {
            subBtn.textContent = 'Unsubscribe from Push Messaging';
            subBtn.disabled = false;
            isPushEnabled = true;
            showMessage('Successfully subscribed to push notifications.');
          }
        });
      })
      .catch((err) => {
        console.log('Error while subscribing to push notifications.', err);
      });
  });
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function unsubscribe(reg) {
  reg.pushManager.getSubscription().then((subscription) => {
    if (!subscription) {
      subBtn.disabled = false;
      showMessage('Subscription is not available.');
      return;
    }
    postSubscribeObj('unsubscribe', subscription, (response) => {
      if (response.status === 202) {
        subscription.unsubscribe()
          .then((successful) => {
            subBtn.textContent = 'Subscribe to Push Messaging';
            showMessage('Successfully unsubscribed from push notifications.');
            isPushEnabled = false;
            subBtn.disabled = false;
          })
          .catch((error) => {
            subBtn.textContent = 'Unsubscribe from Push Messaging';
            showMessage('Error while unsubscribing from push notifications.');
            subBtn.disabled = false;
          });
      }
    });
  });
}

function postSubscribeObj(statusType, subscription, callback) {
  const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari|trident)/ig)[0].toLowerCase();
  const user_agent = navigator.userAgent;
  const data = {
    status_type: statusType,
    subscription: subscription.toJSON(),
    browser: browser,
    user_agent: user_agent,
    group: subBtn.dataset.group
  };

  fetch(subBtn.dataset.url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  }).then(callback);
}


</script>

<BaseLayout>
  <!--<img id="picture" src="/static/logo.png" alt="Logo">-->
  <div id="container">
    <h1>{$_('Notifications.Title')}</h1>
      <button id="webpush-subscribe-button">
        Subscribe to Push Messaging
      </button>
      <div id="webpush-message"></div>

  </div>
</BaseLayout>

<style>
  h1 {
    color : #3fb945;
  }

  #container {
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  #cat-container {
    width: 100vw;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

   #cat-link {
    width: 70vw;
    cursor: pointer;
    padding: 20px;
    border-radius: 15px;
    background-color: white;
    text-decoration: none ;
    font-size: 30px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }

 #cat-link {
    text-decoration: none;
    margin : 10px;
    color : #3fb945;
  }
</style>
