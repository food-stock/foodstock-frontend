<script lang='ts'>
  import { translate } from '../../TranslationStore';
  import BaseLayout from '../BaseLayout.svelte';
  import Cookies from 'js-cookie';
  import Back from '$lib/Back.svelte';
  import { setContext } from 'svelte';

  // Back
  let name = translate('Manage.Back');
  let link = '/managestocks';

  // Gestion de la locale
  const supportedLocales = ['en', 'fr', 'de', 'it', 'es'];
  let currentLocale = Cookies.get('locale') || 'en';

  function changeLocale(locale: string) {
    Cookies.set('locale', locale);
    currentLocale = locale;
  }

  // Création d'un contexte Svelte pour rendre currentLocale réactif
  setContext('currentLocale', currentLocale);
</script>

<BaseLayout>
  <Back {name} {link} />
  {translate('Lang.Effect')}
  <br>
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
</BaseLayout>

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

  .selected {
    background-color: yellow;
  }
</style>
