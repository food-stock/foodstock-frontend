<script lang="ts">
    export let title = 'Dialog Title';
    export let content = 'Dialog content goes here.';
    export let acceptLabel = 'Accept';
    export let refuseLabel = 'Refuse';
    export let onAccept:Function;
    export let onRefuse:Function;
    export let input = "";
    export let show = false;
  
    function handleAccept() {
      if (typeof onAccept === 'function') {
        onAccept();
        show = false;
      }
    }
  
    function handleRefuse() {
      if (typeof onRefuse === 'function') {
        onRefuse();
        show = false;
      }
    }
  </script>
  
  {#if show}
  <div class="dialog">
    <h2>{title}</h2>
    <p>{content}</p>
    <input bind:value={input} type="text" name="input" autocomplete="off">
    <div class="buttons">
        <button class="no" on:click={handleRefuse}>{refuseLabel}</button>
        <button on:click={handleAccept}>{acceptLabel}</button>
    </div>
  </div>
  {/if}
  
  <style>
    h2 {
        font-size: larger;
    }

    p{
        font-size: large;
    }

    .dialog {
      border: 1px solid #ccc;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      text-align: center;
      width: 400px;
      height: 250px;
      position: absolute;
      top: calc(50% - 125px);
      left: calc(50% - 200px);
    }
  
    button {
      margin: 10px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 20px;
      width: 150px;
    }

    .buttons {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    input {
        margin-top: 20px;
        width: 200px;
        height: 30px;
        border-radius: 8px;
        border: 1px solid #ccc;
        padding: 10px;
        font-size: 20px;
    }

    .no {
        background-color: #dc3545;
    }

    @media (max-width: 600px) {
      .dialog {
        width: 300px;
        position: absolute;
        top: calc(50% - 100px);
        left: calc(50% - 171px);
      }

      h2 {
        font-size: larger;
    }

    p{
        margin-top: 40px;
        font-size: large;
        margin-bottom: 10px;
    }
  
    button {
      margin: 10px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 15px;
      font-weight: bold;
      width: 100px;
    }

    .buttons {
        position: absolute;
        bottom: 0;
        left: 50px;
    }
    }

:global(body.dark-mode) .dialog {
    background-color: var(--grey-color);
}

:global(body.dark-mode) h2  {
  color: var(--black-color);
}

:global(body.dark-mode) p {
    color: var(--black-color);
}

:global(body.dark-mode) button {
  color: var(--white-color);
}

:global(body.dark-mode) .buttons {
  color: var(--white-color);
}
  </style>
  