
<script lang='ts'>
    import { translate } from '../../TranslationStore';
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import BaseLayout from '../BaseLayout.svelte';
    import Cookies from 'js-cookie';
    import {goto} from '$app/navigation';

    let scanning = false

    let access_token = Cookies.get('access_token');
    let id = Cookies.get('id');

    let html5Qrcode

    onMount(init)

    function init() {
        html5Qrcode = new Html5Qrcode('reader')
    }

    function start() {
        html5Qrcode.start(
            { facingMode: 'environment' },
            {
                fps: 10,
                qrbox: { width: 250, height: 120 },
            },
            onScanSuccess,
            onScanFailure
        )
        scanning = true
    }

    async function stop() {
        await html5Qrcode.stop()
        scanning = false
    }

    function onScanSuccess(decodedText, decodedResult) {
        stop();
        goto(`/add?barcode=${decodedText}`);
    }

    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
    }
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        width: 100%;
        min-height: 500px;
        background-color: black;
    }

    #bton {
        border : none;
        background-color: var(--green-color);
        border-radius: 20px;
        padding: 10px;
        font-size: 20px;
    }
</style>

<BaseLayout>
  <main>
    <reader id="reader"/>
    {#if scanning}
        <button id="bton" on:click={stop}> {translate('Scan.Stop')}</button>
    {:else}
        <button id="bton" on:click={start}> {translate('Scan.Start')}</button>
    {/if}
  </main>
</BaseLayout>