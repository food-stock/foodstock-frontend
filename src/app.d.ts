import { App } from './types'; 
import './src/i18n.ts';


const app: App = new Router({
  target: document.body
});

declare global {
	namespace App {
	}
}

export default app;