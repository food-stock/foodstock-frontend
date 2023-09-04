<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";

  // Exported props
  export let message = "";
  export let duration = 3000; // Default duration for the snackbar to show in milliseconds

  // Create a writable store for the snackbar visibility
  const isVisible = writable(false);

  // Function to show the snackbar
  function show() {
    isVisible.set(true);
  }

  // Function to hide the snackbar
  function hide() {
    isVisible.set(false);
  }

  // Trigger the show function when the component mounts
  onMount(() => {
  setTimeout(() => {
    const button = document.querySelector("button");
    const toast = document.querySelector(".toast");
    const closeIcon = document.querySelector(".close");
    const progress = document.querySelector(".progress");

    let timer1 :any, timer2:any;

    if (button && toast && progress) {
      button.addEventListener("click", () => {
        // Show the snackbar
        show();

        // Add and remove CSS classes for the toast and progress bar
        toast.classList.add("active");
        progress.classList.add("active");

        timer1 = setTimeout(() => {
          toast.classList.remove("active");
        }, 5000);

        timer2 = setTimeout(() => {
          progress.classList.remove("active");
        }, 5300);
      });

      if (closeIcon && toast && progress) {
        closeIcon.addEventListener("click", () => {
          // Hide the snackbar and clear timers when the close icon is clicked
          hide();
          toast.classList.remove("active");
          setTimeout(() => {
            progress.classList.remove("active");
          }, 300);

          clearTimeout(timer1);
          clearTimeout(timer2);
        });

        // Add a click event listener to the document to handle clicks outside the snackbar
        document.addEventListener("click", handleClickOutside);
      }
    }
  }, 0);
});


  // Function to handle clicks outside the snackbar
  function handleClickOutside(event: any) {
    if (!event.target.closest(".toast")) {
      hide();
    }
  }

  // Clean up the event listener when the component is unmounted
  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

  
  <style>

    .toast{
    position: absolute;
    top: 25px;
    right: 30px;
    border-radius: 12px;
    background: #fff;
    padding: 20px 35px 20px 25px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    border-left: 6px solid #4070f4;
    overflow: hidden;
    transform: translateX(calc(100% + 30px));
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
}
.toast.active{
    transform: translateX(0%);
}
.toast .toast-content{
    display: flex;
    align-items: center;
}
.toast-content .check{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    background-color: #4070f4;
    color: #fff;
    font-size: 20px;
    border-radius: 50%;
}
.toast-content .message{
    display: flex;
    flex-direction: column;
    margin: 0 20px;
}
.message .text{
    font-size: 20px;
    font-weight: 400;;
    color: #666666;
}
.message .text.text-1{
    font-weight: 600;
    color: #333;
}
.toast .close{
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
}
.toast .close:hover{
    opacity: 1;
}
.toast .progress{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: #ddd;
}
.toast .progress:before{
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #4070f4;
}
.progress.active:before{
    animation: progress 5s linear forwards;
}
@keyframes progress {
    100%{
        right: 100%;
    }
}
button{
    padding: 12px 20px;
    font-size: 20px;
    outline: none;
    border: none;
    background-color: #4070f4;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}
button:hover{
    background-color: #0e4bf1;
}
.toast.active ~ button{
    pointer-events: none;
}

  </style>

<div class="toast" class:active="{isVisible}">
  <div class="toast-content">
    <i class="fas fa-solid fa-check check"></i>
    <div class="message">
      <span class="text text-1">Success</span>
      <span class="text text-2">{message}</span>
    </div>
  </div>
  <i class="fa-solid fa-xmark close"></i>
  <div class="progress"></div>
</div>
<button on:click={show}>Show Toast</button>
  