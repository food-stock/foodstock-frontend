// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// main.ts
import Router from './Router.svelte';
import { App } from './types'; // Import your Svelte app component type definition if needed

const app: App = new Router({
  target: document.body
});

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export default app;