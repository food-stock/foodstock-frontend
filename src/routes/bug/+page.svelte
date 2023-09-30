<script lang="ts">
import { translate } from "$lib/locales/TranslationStore";
</script>
<h1>{translate("Bug.Title")}</h1>
<h2>{translate("Bug.Desc")}</h2>

<!--
<input type="text" placeholder={translate("Bug.Placeholder")}/>
<button>{translate("Bug.Submit")}</button>
-->
Please open a <a href="https://github.com/food-stock/foodstock-frontend">Github issue</a> or contact us on <a href="https://discord.gg/aBGtEJTMDU">Discord</a> if you have any issues with the app.

<style>
a {
  color: var(--green-color);
  text-decoration: none;
}
</style>