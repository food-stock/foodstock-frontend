<script lang="ts">
    export let name: string;
    export let onClickFunction: () => void;
  
    function handleClick() {
      if (typeof onClickFunction === 'function') {
        onClickFunction(); // Call the provided function
      }
    }
  </script>
  
  <button class="blue-item" on:click={handleClick}>
    {name}
  </button>
    
  <style>
    .blue-item {
      background-color: var(--green-color);
      width: 30vw;
      height: 10vw;
      margin: 10px;
      padding: 10px;
      border-radius: 20px;
      cursor: pointer;
      text-align: center;
      word-wrap: break-word;
      color : var(--white-color);
    }
  
    @media (max-width: 600px) {
      .blue-item {
        width: 30vw;
        height: 10vw;
      }
    }
  
    :global(body.dark-mode) .blue-item {
      background-color: var(--blue-color);
      color: var(--black-color);
    }
  </style>
  