<script>
    import { translate } from "$lib/locales/TranslationStore";
    function share() {
      let text = "I'm using FoodStock to reduce food waste. Join me!"
      if (navigator.share) {
        navigator
          .share({
            title: 'FoodStock',
            text: text,
            url: window.location.href,
          })
          .then(() => console.log('Shared successfully'))
          .catch((error) => console.error('Error sharing:', error));
      } else {
        alert('A link has been copied to your clipboard. Send it to your friends to reduce food waste together!');
      }
    }
  </script>
  
  <button on:click={share}><div class="text">{translate('Share.Title')}</div><div class="icon"><i class="fa-solid fa-share-from-square"></i></div></button>

  <style>
    button {
      border: none;
      background-color: var(--green-color);
      color : var(--white-color);
      border-radius: 10px;
      cursor: pointer;
      padding: 0;
      margin: 0;
      outline: none;
      border-radius: 10px;
      width: 200px;
      height: 90px;
      text-align: center;
      font-size: 26px;
      margin: 10px;
      display: flex;
      flex-direction: row;
    }

    .text {
        margin: auto;
    }

    .icon {
        margin: auto;
    }

    :global(body.dark-mode) button {
        background-color: var(--blue-color);
        color : var(--black-color);
    }

    @media (max-width: 600px) {
      button {
        width: 50px;
        height: 50px;
        font-size: 16px;
        border-radius: 200px;
      }

      .text {
        margin: auto;
        display: none;
       }

        .icon {
            margin: auto;
            transform: translate(2px,-2px);
        }
    }
  </style>
  