<script>
    import Cookies from 'js-cookie';
    export let showPopup = false;
  
    function acceptCookies() {
      showPopup = false;
      Cookies.set('cookiesaccepted', 'true');
    }


  </script>
  
  {#if showPopup}
  <div class="popup-cookies">
    <div class="popup-content">
      <h2>On vous a pas encore demmandé d'accepter les cookies ? C'est normal ...</h2>
      <p>Nous utilisons aucun cookies permettant de vous traquer ou de récolter des données sur vos habitudes.</p>
      <button class="no" on:click={acceptCookies}>Okay merci</button>
      <button on:click={acceptCookies}>C'est gentil</button>
    </div>
  </div>
  {/if}
  
  <style>
    .popup-cookies {
      position: fixed;
      bottom: 20px;
      right: 10px;
      left: 10px;
      background-color: #fff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      padding: 20px;
      z-index: 1000;
    }
  
    .popup-content {
      text-align: center;
    }
  
    button {
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .no {
        background-color: #ff0000;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    h2 {
        font-size: 1.5rem;
        padding: 5px;
    }
  </style>
  