<script>
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
  
    export let message = "";
    export let duration = 3000; // Default duration for the snackbar to show in milliseconds
  
    // Create a writable store for the snackbar visibility
    const isVisible = writable(false);
  
    // Function to show the snackbar
    function show() {
      isVisible.set(true);
      // Hide the snackbar after the specified duration
      setTimeout(() => {
        isVisible.set(false);
      }, duration);
    }
  
    // Function to hide the snackbar when it is dismissed by the user
    function hide() {
      isVisible.set(false);
    }
  
    // Trigger the show function when the component mounts
    onMount(show);
  
    // Function to handle clicks outside the snackbar
    function handleClickOutside(event) {
      if (!event.target.closest(".snackbar")) {
        hide();
      }
    }
    
    // Clean up the event listener when the component is unmounted
    onDestroy(() => {
      document.removeEventListener("click", handleClickOutside);
    });
  </script>
  
  <style>
    .snackbar {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 12px 20px;
      border-radius: 8px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0s linear 0.3s;
    }
  
    .show {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s;
    }
  
    .close-btn {
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      color: #fff;
      font-size: 16px;
    }
  </style>
  
  {#if $isVisible}
    <div class="snackbar show">
      <span>{message}</span>
      <span class="close-btn" on:click={hide}>&times;</span>
    </div>
  {/if}
  