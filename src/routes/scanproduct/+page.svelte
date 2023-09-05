<script lang='ts'>
    import { translate } from '$lib/locales/TranslationStore';
    import { Html5Qrcode } from 'html5-qrcode';
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';

    let scanning = false;

    let html5Qrcode: Html5Qrcode;

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

    function onScanSuccess(decodedText: string, decodedResult: any) {
        stop();
        goto(`/add?barcode=${decodedText}`);
    }

    function onScanFailure(error : any) {
      // handle scan failure, usually better to ignore and keep scanning.
    }
</script>

<div class="container">
    <reader id="reader"/>
    {#if scanning}
        <button id="bton" on:click={stop}> {translate('Scan.Stop')}</button>
    {:else}
        <div class="lds-ring"></div>
        <button id="bton" on:click={start}> {translate('Scan.Start')}</button>
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .lds-ring {
        display: inline-block;
        width: 80px;
        height:350px;
    }

    reader {
        top : 40vh;
        width: 100%;
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
