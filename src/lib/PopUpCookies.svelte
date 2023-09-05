<!-- PopUpCookies.svelte -->

<script>
    let showPopup = true;
  
    function acceptCookies() {
      showPopup = false;
    }
    function refuseCookies() {
      showPopup = false;
    }


  </script>
  
  {#if showPopup}
  <div class="popup-cookies">
    <div class="popup-content">
      <h2>Accepter les cookies</h2>
      <p>Nous utilisons (le moins possible) des cookies pour améliorer votre expérience sur notre site.</p>
      <button class="no" on:click={refuseCookies}>Refuser</button>
      <button on:click={acceptCookies}>Accepter</button>
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
  