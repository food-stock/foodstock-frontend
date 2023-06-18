<script>
  import { onMount } from 'svelte';

  let sliderWidth = 0;
  let startX = 0;
  let currentX = 0;

  const handleTouchStart = (event) => {
    startX = event.touches[0].clientX;
    currentX = startX;
  };

  const handleTouchMove = (event) => {
    const touchX = event.touches[0].clientX;
    const diffX = touchX - startX;
    currentX = Math.max(Math.min(currentX + diffX, sliderWidth), 0);
    startX = touchX;
  };

  const handleTouchEnd = () => {
    // Perform any action after touch ends (e.g., update slider position, trigger event, etc.)
  };

  onMount(() => {
    sliderWidth = document.querySelector('.slider').clientWidth;
  });
</script>

<style>
  .slider {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: lightgray;
    overflow: hidden;
    touch-action: pan-y;
  }

  .slider .slides {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    transition: transform 0.3s ease;
  }

  .slider .slide {
    flex: 0 0 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
</style>

<div class="slider" on:touchstart={handleTouchStart} on:touchmove={handleTouchMove} on:touchend={handleTouchEnd}>
  <div class="slides" style="transform: translateX(-{currentX}px)">
    <div class="slide">Slide 1</div>
    <div class="slide">Slide 2</div>
    <div class="slide">Slide 3</div>
    <div class="slide">Slide 4</div>
    <div class="slide">Slide 5</div>
  </div>
</div>
