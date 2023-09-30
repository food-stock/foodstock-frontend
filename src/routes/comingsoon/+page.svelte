<script lang="ts">
    import Share from "$lib/interactions/Share.svelte";
    import { translate } from "$lib/locales/TranslationStore";
</script>

<h1>{translate("ComingSoon")}</h1>
<h2>{translate("ComingSoonDesc")}</h2>
<h4>{translate("ComingSoonSupport")}</h4>


<div class="container">
<h3>{translate("Support.Donate")}</h3>
<Share />
</div>

<div class="thks">{translate("Support.Thanks")}</div>
<div class="signature">{translate("Support.Team")}</div>

<style>
.signature {
    text-align: center;
    font-size: 0.8rem;
    margin-top: 2rem;
    font-weight: lighter;
}

.thks {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    color : red
    
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

h1 {
    font-size: 2rem;
    margin-top: 2rem;
}

h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
}

h3 {
    font-size: 1.2rem;
    margin-top: 2rem;
    background-color: var(--green-color);
    width: fit-content;
    padding: 20px;
    border-radius: 20px;
    transform: translateY(-7px);
}

h4 {
    font-size: 1.2rem;
    margin-top: 2rem;
    background-color: var(--green-color);
    width: fit-content;
    padding: 20px;
    border-radius: 20px;
    transform: translateY(-7px);
}
</style>