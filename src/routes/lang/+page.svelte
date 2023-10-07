<script lang='ts'>
  import { translate, setPreferredLocale } from '$lib/locales/TranslationStore';
  import Cookies from 'js-cookie';
  import Back from '$lib/nav/Back.svelte';
  import { setContext } from 'svelte';
  import { goto } from '$app/navigation';

  // Back button
  let name = translate('Manage.Back');
  let backRoute = '/managestocks';
  function navigateBack() {
    goto(backRoute);
  }

  // Gestion de la locale
  const supportedLocales = ['en', 'fr', 'de', 'it', 'es'];
  let currentLocale = Cookies.get('preferredLocale') || 'en';

  function changeLocale(locale: string) {
    setPreferredLocale(locale);
    currentLocale = locale; // Update the currentLocale
  }

  // Création d'un contexte Svelte pour rendre currentLocale réactif
  setContext('currentLocale', currentLocale);
</script>


  <Back {name} {navigateBack} />
  <div class="eff">{translate('Lang.Effect')}</div>
  <ul>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    {#each supportedLocales as locale}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        on:click={() => changeLocale(locale)}
        class:selected={currentLocale === locale}
      >
        {locale === 'en' ? translate('Lang.English') : ''}
        {locale === 'fr' ? translate('Lang.French') : ''}
        {locale === 'de' ? translate('Lang.German') : ''}
        {locale === 'it' ? translate('Lang.Italian') : ''}
        {locale === 'es' ? translate('Lang.Spanish') : ''}
      </li>
    {/each}
  </ul>


<style>
  ul {
    flex-direction: row;
    list-style-type: none;
    padding: 0;
    justify-content: center;
  }

  li {
    cursor: pointer;
    padding: 10px;
    border-radius: 15px;
    background-color: beige;
    text-align: center;
    margin: 10px;
  }

  li.selected {
    background-color: yellow;
  }
</style>
